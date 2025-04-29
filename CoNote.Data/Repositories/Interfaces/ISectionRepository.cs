using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface ISectionRepository : IBaseRepository<Section>
{
    Task<bool> ExistsByIdAsync(long id, CancellationToken cancellationToken);
    IQueryable<Section> GetListByWorkspaceId(long workspaceId);
    IQueryable<Section> GetListByWorkspaceAndParentId(long workspaceId, long? parentId);
}
