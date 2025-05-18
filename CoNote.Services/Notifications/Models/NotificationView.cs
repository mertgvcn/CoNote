using CoNote.Core.Enums;

namespace CoNote.Services.Notifications.Models;
public record NotificationView
{
    public long Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatedAtHumanized { get; set; } = default!;
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public NotificationType Type { get; set; } = NotificationType.Other;
}
