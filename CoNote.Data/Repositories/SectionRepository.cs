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

    public async Task<bool> ExistsByIdAsync(long id, CancellationToken cancellationToken)
    {
        return await GetAll().AnyAsync(a => a.Id == id, cancellationToken);
    }

    public IQueryable<Section> GetListByWorkspaceId(long workspaceId)
    {
        return GetAll().Where(s => s.WorkspaceId == workspaceId);
    }

    public IQueryable<Section> GetListByWorkspaceAndParentId(long workspaceId, long? parentId)
    {
        return GetListByWorkspaceId(workspaceId)
            .Where(s => s.ParentId == parentId);
    }
}
