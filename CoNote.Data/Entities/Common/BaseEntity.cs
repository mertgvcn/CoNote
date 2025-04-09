namespace CoNote.Core.Entities.Common;

public abstract class BaseEntity
{
    public long Id { get; init; }
    public string CreatedBy { get; init; } = default!;
    public DateTime CreatedAt { get; init; } = DateTime.Now;
}
