using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class StyleRepository : BaseRepository<Style>, IStyleRepository
{
    private readonly CoNoteContext _context;

    public StyleRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
