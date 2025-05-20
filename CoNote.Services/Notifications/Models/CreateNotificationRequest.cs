using CoNote.Core.Enums;

namespace CoNote.Services.Notifications.Models;
public record CreateNotificationRequest
{
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public long UserId { get; set; }
    public string? CreatedBy { get; set; } = default!;
    public NotificationType Type { get; set; } = NotificationType.Other;
}
