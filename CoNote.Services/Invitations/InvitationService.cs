using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Invitations.Interfaces;
using CoNote.Services.Invitations.Models;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Notifications.Models;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Users.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Invitations;
public class InvitationService : IInvitationService
{
    private readonly IInvitationRepository _invitationRepository;
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserService _userService;
    private readonly INotificationService _notificationService;
    private readonly IPermissionService _permissionService;
    private readonly IMapper _mapper;
    private readonly ITransactionService _transactionService;

    public InvitationService(
        IInvitationRepository invitationRepository,
        IWorkspaceRepository workspaceRepository,
        IRoleRepository roleRepository,
        IUserService userService,
        INotificationService notificationService,
        IPermissionService permissionService,
        IMapper mapper,
        ITransactionService transactionService)
    {
        _invitationRepository = invitationRepository;
        _workspaceRepository = workspaceRepository;
        _roleRepository = roleRepository;
        _userService = userService;
        _notificationService = notificationService;
        _permissionService = permissionService;
        _mapper = mapper;
        _transactionService = transactionService;
    }

    public async Task SendInvitationAsync(SendInvitationRequest request, CancellationToken cancellationToken)
    {
        var workspaceName = await _workspaceRepository.GetNameByIdAsync(request.WorkspaceId, cancellationToken);
        if (workspaceName == null)
        {
            throw new WorkspaceNotFoundException();
        }

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            request.WorkspaceId,
            PermissionAction.Add,
            PermissionObjectType.Invitations,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var roleName = await _roleRepository.GetNameByIdAsync(request.RoleId, cancellationToken);
        if (roleName == null)
        {
            throw new RoleNotFoundException();
        }

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var invitation = _mapper.Map<Invitation>(request);
        invitation.SenderId = currentUser.Id;
        invitation.Type = InvitationType.InviteSent;
        invitation.Status = InvitationStatus.Pending;
        invitation.CreatedBy = currentUser.Username;
        invitation.EditedBy = currentUser.Username;

        await _invitationRepository.AddAsync(invitation);

        var notificationRequest = new CreateNotificationRequest()
        {
            UserId = request.ReceiverId,
            CreatedBy = currentUser.Username,
            IsRead = false,
            Message = $"'{currentUser.Username}' invites you to workspace named '{workspaceName}' with role '{roleName}'.",
            Type = NotificationType.Invitation,
        };

        await _notificationService.CreateNotificationAsync(notificationRequest, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<long> DeleteInvitationAsync(long invitationId, CancellationToken cancellationToken)
    {
        var workspaceId = await _invitationRepository.GetWorkspaceIdByIdAsync(invitationId, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.Delete,
            PermissionObjectType.Invitations,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var invitation = await _invitationRepository.GetByIdAsync(invitationId, cancellationToken);
        if (invitation == null)
        {
            throw new InvitationNotFoundException();
        }

        await _invitationRepository.DeleteAsync(invitation);
        return invitationId;
    }

    public async Task<List<InvitationView>> GetCurrentUserInvitationsAsync(CancellationToken cancellationToken)
    {
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var invitations = await _invitationRepository.GetListByReceiverId(currentUser.Id)
            .ToListAsync(cancellationToken);

        var invitationViews = _mapper.Map<List<InvitationView>>(invitations);

        return invitationViews;
    }

    public async Task UpdateInvitationStatusAsync(UpdateInvitationStatusRequest request, CancellationToken cancellationToken)
    {
        var invitation = await _invitationRepository.GetByIdAsync(request.InvitationId);
        invitation.Status = request.Status;

        await _invitationRepository.UpdateAsync(invitation, cancellationToken);
    }
}
