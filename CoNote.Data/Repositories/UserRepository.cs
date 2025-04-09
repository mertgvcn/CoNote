using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly CoNoteContext _context;

    public UserRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
