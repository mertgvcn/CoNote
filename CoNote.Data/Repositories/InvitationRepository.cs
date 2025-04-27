using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class InvitationRepository : BaseRepository<Invitation>, IInvitationRepository
{
    private readonly CoNoteContext _context;

    public InvitationRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Invitation> GetListByWorkspaceId(long workspaceId)
    {
        return GetAll()
            .Where(i => i.WorkspaceId == workspaceId)
            .Include(i => i.Sender)
            .Include(i => i.Receiver)
            .Include(i => i.Role);
    }
}
