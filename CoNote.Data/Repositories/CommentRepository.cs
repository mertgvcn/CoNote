using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class CommentRepository : BaseRepository<Comment>, ICommentRepository
{
    private readonly CoNoteContext _context;

    public CommentRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
