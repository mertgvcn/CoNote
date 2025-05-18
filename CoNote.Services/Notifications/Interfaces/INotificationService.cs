using CoNote.Services.Notifications.Models;

namespace CoNote.Services.Notifications.Interfaces;
public interface INotificationService
{
    Task CreateNotificationAsync(CreateNotificationRequest request, CancellationToken cancellationToken);

}
