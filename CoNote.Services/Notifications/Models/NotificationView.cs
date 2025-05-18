using CoNote.Core.Enums;

namespace CoNote.Services.Notifications.Models;
public record NotificationView
{
    public long Id { get; set; }
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public NotificationType Type { get; set; } = NotificationType.Other;
}
