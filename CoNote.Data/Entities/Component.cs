using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;

namespace CoNote.Core.Entities;
public sealed class Component : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public long WorksheetId { get; set; }
    public Worksheet Worksheet { get; set; } = default!;
    public int? Width { get; set; }
    public int? Height { get; set; }
    public int ZIndex { get; set; } = 0;
    public int X { get; set; }
    public int Y { get; set; }
    public int Rotation { get; set; } = 0;
    public ComponentType Type { get; set; }
    public string? Content { get; set; }
    public string? Style { get; set; }
}
