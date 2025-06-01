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
            .Include(i => i.Workspace)
            .Include(i => i.Sender)
            .Include(i => i.Receiver)
            .Include(i => i.Role);
    }

    public IQueryable<Invitation> GetListByReceiverId(long receiverId)
    {
        return GetAll()
            .Where(n => n.ReceiverId == receiverId)
            .Include(i => i.Workspace)
            .Include(i => i.Sender)
            .Include(i => i.Receiver)
            .Include(i => i.Role);
    }

    public async Task<long> GetWorkspaceIdByIdAsync(long invitationId, CancellationToken cancellationToken)
    {
        return await GetAll()
            .Where(w => w.Id == invitationId)
            .Select(w => w.WorkspaceId)
            .SingleOrDefaultAsync(cancellationToken);
    }
}
