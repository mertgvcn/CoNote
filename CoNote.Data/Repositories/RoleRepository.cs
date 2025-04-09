using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    private readonly CoNoteContext _context;

    public RoleRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
