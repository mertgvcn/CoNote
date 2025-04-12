namespace CoNote.Core.Entities.Common;

public abstract class BaseEntity
{
    public long Id { get; init; }
    public string CreatedBy { get; set; } = default!;
    public DateTime CreatedAt { get; init; } = DateTime.Now;
}
