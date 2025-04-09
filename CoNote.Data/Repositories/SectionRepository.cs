using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class SectionRepository : BaseRepository<Section>, ISectionRepository
{
    private readonly CoNoteContext _context;

    public SectionRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
