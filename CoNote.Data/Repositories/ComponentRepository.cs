using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class ComponentRepository : BaseRepository<Component>, IComponentRepository
{
    private readonly CoNoteContext _context;

    public ComponentRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Component>> GetListByWorksheetId(long worksheetId, CancellationToken cancellationToken = default)
    {
        return await GetAll()
            .Where(c => c.WorksheetId == worksheetId)
            .ToListAsync(cancellationToken);
    }
}
