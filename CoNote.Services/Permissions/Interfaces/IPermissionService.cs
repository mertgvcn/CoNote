using CoNote.Core.Enums;
using CoNote.Services.Permissions.Models;

namespace CoNote.Services.Permissions.Interfaces;
public interface IPermissionService
{
    Task<List<PermissionView>> GetCurrentUserPermissionsByWorkspaceIdAsync(
        long workspaceId,
        CancellationToken cancellationToken);

    Task<bool> HasCurrentUserSpecificPermissionOnWorkspaceAsync(
        long workspaceId,
        PermissionAction action,
        PermissionObjectType objectType,
        CancellationToken cancellationToken);
}
