using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IWorkspaceMemberRepository : IBaseRepository<WorkspaceMember>
{
    IQueryable<Workspace> GetWorkspacesByUserId(long userId);
    IQueryable<WorkspaceMember> GetListByWorkspaceId(long workspaceId);
    Task<bool> IsUserInWorkspaceAsync(long userId, long workspaceId, CancellationToken cancellationToken);
    Task<Role?> GetUserRoleAsync(long userId, long workspaceId, CancellationToken cancellationToken);
}
