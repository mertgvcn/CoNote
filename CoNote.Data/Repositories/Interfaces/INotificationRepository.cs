using CoNote.Data.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface INotificationRepository : IBaseRepository<Notification>
{
    IQueryable<Notification> GetListByUserId(long userId);

}
