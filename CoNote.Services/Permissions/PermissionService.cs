using AutoMapper;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Permissions.Models;
using CoNote.Services.Users.Interfaces;

namespace CoNote.Services.Permissions;
public class PermissionService : IPermissionService
{
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public PermissionService(
        IWorkspaceRepository workspaceRepository,
        IWorkspaceMemberRepository workspaceMemberRepository,
        IUserService userService,
        IMapper mapper)
    {
        _workspaceRepository = workspaceRepository;
        _workspaceMemberRepository = workspaceMemberRepository;
        _userService = userService;
        _mapper = mapper;
    }

    public async Task<List<PermissionView>> GetCurrentUserPermissionsByWorkspaceIdAsync(
        long workspaceId,
        CancellationToken cancellationToken)
    {
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var workspace = await _workspaceRepository.GetByIdAsync(workspaceId, cancellationToken);
        if (workspace == null)
        {
            throw new WorkspaceNotFoundException();
        }

        var isMember = await IsUserInWorkspaceAsync(currentUser.Id, workspaceId, cancellationToken);
        if (!isMember && workspace.IsPrivate)
        {
            return [];
        }

        if (!isMember && !workspace.IsPrivate)
        {
            return [
                new PermissionView
                {
                    Action = PermissionAction.View,
                    ObjectType = PermissionObjectType.Structure
                },
                new PermissionView
                {
                    Action = PermissionAction.View,
                    ObjectType = PermissionObjectType.Worksheet
                }
            ];
        }

        var role = await _workspaceMemberRepository.GetUserRoleAsync(currentUser.Id, workspaceId, cancellationToken);
        if (role == null)
        {
            throw new RoleNotFoundException($"Role not found for user {currentUser.Id} in workspace {workspaceId}.");
        }

        var permissionViews = _mapper.Map<List<PermissionView>>(role.Permissions);
        return permissionViews;
    }

    public async Task<bool> HasCurrentUserSpecificPermissionOnWorkspaceAsync(
        long workspaceId,
        PermissionAction action,
        PermissionObjectType objectType,
        CancellationToken cancellationToken)
    {
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var workspace = await _workspaceRepository.GetByIdAsync(workspaceId, cancellationToken);
        if (workspace == null)
        {
            throw new WorkspaceNotFoundException();
        }

        var isMember = await IsUserInWorkspaceAsync(currentUser.Id, workspaceId, cancellationToken);
        if (!isMember && workspace.IsPrivate)
        {
            return false;
        }

        if (!isMember && !workspace.IsPrivate)
        {
            return IsPublicAccessAllowed(action, objectType);
        }

        var role = await _workspaceMemberRepository.GetUserRoleAsync(currentUser.Id, workspaceId, cancellationToken);
        if (role == null)
        {
            return false;
        }

        return role.Permissions.Any(p => p.Action == action && p.ObjectType == objectType);
    }

    private async Task<bool> IsUserInWorkspaceAsync(long userId, long workspaceId, CancellationToken cancellationToken)
    {
        return await _workspaceMemberRepository.IsUserInWorkspaceAsync(userId, workspaceId, cancellationToken);
    }

    private bool IsPublicAccessAllowed(PermissionAction action, PermissionObjectType objectType)
    {
        return (action == PermissionAction.View && objectType == PermissionObjectType.Structure) ||
               (action == PermissionAction.View && objectType == PermissionObjectType.Worksheet);
    }
}
