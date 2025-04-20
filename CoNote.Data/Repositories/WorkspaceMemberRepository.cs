using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

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
}
