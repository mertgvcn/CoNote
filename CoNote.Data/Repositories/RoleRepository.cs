using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class RoleRepository : BaseRepository<Role>, IRoleRepository
{
    private readonly CoNoteContext _context;

    public RoleRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Role> GetRolesByWorkspaceId(long workspaceId)
    {
        return GetAll()
            .Where(r => r.WorkspaceId == workspaceId);
    }

    public async Task<string> GetNameByIdAsync(long id, CancellationToken cancellationToken)
    {
        var roleName = await GetAll()
            .Where(w => w.Id == id)
            .Select(w => w.Name)
            .SingleAsync(cancellationToken);

        return roleName;
    }
}
