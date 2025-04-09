using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class ComponentRepository : BaseRepository<Component>, IComponentRepository
{
    private readonly CoNoteContext _context;

    public ComponentRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
