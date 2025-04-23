using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class SectionRepository : BaseRepository<Section>, ISectionRepository
{
    private readonly CoNoteContext _context;

    public SectionRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> SectionExistsByIdAsync(long id, CancellationToken cancellationToken)
    {
        return await GetAll().AnyAsync(a => a.Id == id, cancellationToken);
    }

    public IQueryable<Section> GetSectionsByWorkspaceId(long workspaceId)
    {
        return GetAll().Where(s => s.WorkspaceId == workspaceId);
    }
}
