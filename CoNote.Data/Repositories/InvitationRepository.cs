using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class InvitationRepository : BaseRepository<Invitation>, IInvitationRepository
{
    private readonly CoNoteContext _context;

    public InvitationRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
