using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class WorksheetStyleRepository : BaseRepository<WorksheetStyle>, IWorksheetStyleRepository
{
    private readonly CoNoteContext _context;

    public WorksheetStyleRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
