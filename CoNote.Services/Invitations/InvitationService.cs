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
        };

        await _notificationService.CreateNotificationAsync(notificationRequest, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}
