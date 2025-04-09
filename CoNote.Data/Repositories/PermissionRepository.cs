using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
{
    private readonly CoNoteContext _context;

    public PermissionRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
