using CoNote.Services.Notifications.Models;

namespace CoNote.Services.Notifications.Interfaces;
public interface INotificationService
{
    Task CreateNotificationAsync(CreateNotificationRequest request, CancellationToken cancellationToken);
    Task<List<NotificationView>> GetCurrentUserNotificationsAsync(CancellationToken cancellationToken);
    Task<List<long>> MarkNotificationsAsReadAsync(MarkNotificationsAsReadRequest request, CancellationToken cancellationToken);
    Task<long> DeleteNotificationById(long notificationId, CancellationToken cancellationToken);
}
