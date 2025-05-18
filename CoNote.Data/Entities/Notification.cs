using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;

namespace CoNote.Core.Entities;
public sealed class Notification : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public long UserId { get; set; }
    public User User { get; set; } = default!;
    public NotificationType Type { get; set; } = NotificationType.Other;
}
