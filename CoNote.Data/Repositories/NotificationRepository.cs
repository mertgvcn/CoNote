using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class NotificationRepository : BaseRepository<Notification>, INotificationRepository
{
    private readonly CoNoteContext _context;

    public NotificationRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }

    public IQueryable<Notification> GetListByUserId(long userId)
    {
        return GetAll()
            .Where(n => n.UserId == userId);
    }
}
