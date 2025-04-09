using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class ComponentGroupRepository : BaseRepository<ComponentGroup>, IComponentGroupRepository
{
    private readonly CoNoteContext _context;

    public ComponentGroupRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
