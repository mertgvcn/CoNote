using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class WorksheetRepository : BaseRepository<Worksheet>, IWorksheetRepository
{
    private readonly CoNoteContext _context;

    public WorksheetRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Worksheet> GetListByWorkspaceAndSectionId(long workspaceId, long? sectionId)
    {
        return GetAll()
            .Where(w => w.WorkspaceId == workspaceId && w.SectionId == sectionId);
    }

    public async Task<long> GetWorkspaceIdByIdAsnyc(long worksheetId, CancellationToken cancellationToken)
    {
        return await GetAll()
            .Where(w => w.Id == worksheetId)
            .Select(w => w.WorkspaceId)
            .SingleOrDefaultAsync(cancellationToken);
    }
}


