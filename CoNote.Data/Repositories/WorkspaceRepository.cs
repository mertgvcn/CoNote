using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class WorkspaceRepository : BaseRepository<Workspace>, IWorkspaceRepository
{
    private readonly CoNoteContext _context;

    public WorkspaceRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> ExistsByIdAsync(long id, CancellationToken cancellationToken)
    {
        return await GetAll().AnyAsync(a => a.Id == id, cancellationToken);
    }

    public async Task<string> GetNameByIdAsync(long id, CancellationToken cancellationToken)
    {
        var workspaceName = await GetAll()
            .Where(w => w.Id == id)
            .Select(w => w.Name)
            .SingleAsync(cancellationToken);

        return workspaceName;
    }

    public IQueryable<Workspace> SearchByName(string searchValue = "")
    {
        return GetAll()
            .Where(w => w.Name.ToLower().Contains(searchValue.ToLower()) && w.IsDeleted == false && w.IsPrivate == false);
    }
}
