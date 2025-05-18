using CoNote.Core.Entities;
using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;
using CoNote.Data.Entities.Common;

namespace CoNote.Data.Entities;
public sealed class Notification : BaseEntity, IEditable, IDeletable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public long UserId { get; set; }
    public User User { get; set; } = default!;
    public NotificationType Type { get; set; } = NotificationType.Other;
}
