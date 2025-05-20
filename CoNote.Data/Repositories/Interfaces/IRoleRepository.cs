using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IRoleRepository : IBaseRepository<Role>
{
    IQueryable<Role> GetRolesByWorkspaceId(long workspaceId);
    Task<string> GetNameByIdAsync(long id, CancellationToken cancellationToken);
}
