namespace CoNote.Services.Notifications.Models;
public class MarkNotificationsAsReadRequest
{
    public List<long> NotificationIds { get; set; } = default!;
}
