using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IWorkspaceRepository : IBaseRepository<Workspace>
{
    Task<bool> WorkspaceExistsByIdAsync(long id, CancellationToken cancellationToken);
}
