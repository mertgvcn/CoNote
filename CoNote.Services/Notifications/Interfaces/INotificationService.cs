using CoNote.Services.Notifications.Models;

namespace CoNote.Services.Notifications.Interfaces;
public interface INotificationService
{
    Task CreateNotificationAsync(CreateNotificationRequest request, CancellationToken cancellationToken);
    Task<List<NotificationView>> GetCurrentUserNotificationsAsync(CancellationToken cancellationToken);
    Task MarkNotificationsAsReadAsync(MarkNotificationsAsReadRequest request, CancellationToken cancellationToken);
}
