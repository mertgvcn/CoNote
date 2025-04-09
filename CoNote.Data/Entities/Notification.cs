using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Notification : BaseEntity
{
    public string Message { get; set; } = default!;
    public bool IsRead { get; set; } = false;
    public long UserId { get; set; }
    public User User { get; set; } = default!;
}
