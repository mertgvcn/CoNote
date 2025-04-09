using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Comment : BaseEntity
{
    public string Content { get; set; } = default!;
    public long WorksheetId { get; set; }
    public Worksheet Worksheet { get; set; } = default!;
    public long UserId { get; set; }
    public User User { get; set; } = default!;
}
