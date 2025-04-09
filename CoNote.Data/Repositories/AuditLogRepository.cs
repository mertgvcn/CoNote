using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class AuditLogRepository : BaseRepository<AuditLog>, IAuditLogRepository
{
    private readonly CoNoteContext _context;

    public AuditLogRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
