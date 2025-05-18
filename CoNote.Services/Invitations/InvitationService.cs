using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Invitations.Interfaces;
using CoNote.Services.Invitations.Models;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Notifications.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Invitations;
public class InvitationService : IInvitationService
{
    private readonly IInvitationRepository _invitationRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IUserRepository _userRepository;
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly INotificationService _notificationService;
    private readonly IMapper _mapper;
    private readonly ITransactionService _transactionService;

    public InvitationService(
        IInvitationRepository invitationRepository,
        IHttpContextService httpContextService,
        IUserRepository userRepository,
        IWorkspaceRepository workspaceRepository,
        IRoleRepository roleRepository,
        INotificationService notificationService,
        IMapper mapper,
        ITransactionService transactionService)
    {
        _invitationRepository = invitationRepository;
        _httpContextService = httpContextService;
        _userRepository = userRepository;
        _workspaceRepository = workspaceRepository;
        _roleRepository = roleRepository;
        _notificationService = notificationService;
        _mapper = mapper;
        _transactionService = transactionService;
    }

    public async Task SendInvitationAsync(SendInvitationRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();

        var user = await _userRepository.GetByIdAsync(currentUserId);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var workspaceName = await _workspaceRepository.GetNameByIdAsync(request.WorkspaceId, cancellationToken);
        if (workspaceName == null)
        {
            throw new WorkspaceNotFoundException();
        }

        var roleName = await _roleRepository.GetNameByIdAsync(request.RoleId, cancellationToken);
        if (roleName == null)
        {
            throw new RoleNotFoundException();
        }

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var invitation = _mapper.Map<Invitation>(request);
        invitation.SenderId = user.Id;
        invitation.Type = InvitationType.InviteSent;
        invitation.Status = InvitationStatus.Pending;
        invitation.CreatedBy = user.Username;
        invitation.EditedBy = user.Username;

        await _invitationRepository.AddAsync(invitation);

        var notificationRequest = new CreateNotificationRequest()
        {
            UserId = request.ReceiverId,
            CreatedBy = user.Username,
            IsRead = false,
            Message = $"'{user.Username}' invites you to workspace named '{workspaceName}' with role '{roleName}'.",
            Type = NotificationType.Invitation,
        };

        await _notificationService.CreateNotificationAsync(notificationRequest, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<long> DeleteInvitationAsync(long invitationId, CancellationToken cancellationToken)
    {
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
        var currentUserId = _httpContextService.GetCurrentUserId();
        var user = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var invitations = await _invitationRepository.GetListByReceiverId(currentUserId)
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
