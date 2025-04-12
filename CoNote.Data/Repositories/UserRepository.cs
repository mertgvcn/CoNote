using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Repositories;
public sealed class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly CoNoteContext _context;

    public UserRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> UserExistsByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await GetAll().AnyAsync(a => a.Email == email, cancellationToken);
    }

    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await GetAll()
            .Where(x => x.Email == email)
            .SingleOrDefaultAsync(cancellationToken);
    }
}
