using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IWorkspaceRepository : IBaseRepository<Workspace>
{
    Task<bool> ExistsByIdAsync(long id, CancellationToken cancellationToken);
}
