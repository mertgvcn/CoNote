using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class WorkspaceMemberRepository : BaseRepository<WorkspaceMember>, IWorkspaceMemberRepository
{
    private readonly CoNoteContext _context;

    public WorkspaceMemberRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Workspace> GetWorkspacesByUserId(long userId)
    {
        return GetAll()
           .Where(wm => wm.UserId == userId)
           .Select(wm => wm.Workspace)
           .Where(w => !w.IsDeleted);
    }

    public IQueryable<WorkspaceMember> GetListByWorkspaceId(long workspaceId)
    {
        return GetAll()
            .Where(wm => wm.WorkspaceId == workspaceId)
            .Include(wm => wm.User)
            .Include(wm => wm.Role);
    }

    public async Task<bool> IsUserInWorkspaceAsync(long userId, long workspaceId, CancellationToken cancellationToken = default)
    {
        return await GetAll()
            .Where(wm => wm.WorkspaceId == workspaceId)
            .AnyAsync(wm => wm.UserId == userId);
    }

    public async Task<Role?> GetUserRoleAsync(long userId, long workspaceId, CancellationToken cancellationToken = default)
    {
        return await GetAll()
            .Where(wm => wm.WorkspaceId == workspaceId && wm.UserId == userId)
            .Include(wm => wm.Role)
            .ThenInclude(r => r.Permissions)
            .Select(wm => wm.Role)
            .SingleOrDefaultAsync();
    }
}
