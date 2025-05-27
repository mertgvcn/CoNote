using CoNote.Core.Entities;

namespace CoNote.Services.Roles.Interfaces;
public interface IRoleService
{
    Task<List<Role>> CreateDefaultRolesForWorkspaceAsync(Workspace workspace, User createdByUser, CancellationToken cancellationToken);
}