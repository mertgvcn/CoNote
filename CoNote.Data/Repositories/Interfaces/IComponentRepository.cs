using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IComponentRepository : IBaseRepository<Component>
{
    Task<bool> ExistsByIdAsync(long id, CancellationToken cancellationToken);
    Task<List<Component>> GetListByWorksheetId(long worksheetId, CancellationToken cancellationToken = default);
    Task<long> GetWorkspaceIdById(long componentId, CancellationToken cancellationToken = default);
}
