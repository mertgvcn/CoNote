using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IWorksheetRepository : IBaseRepository<Worksheet>
{
    IQueryable<Worksheet> GetListByWorkspaceAndSectionId(long workspaceId, long? sectionId);
    Task<long> GetWorkspaceIdByIdAsnyc(long worksheetId, CancellationToken cancellationToken);
}
