using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;
using CoNote.Core.Models;
using CoNote.Data.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Component : BaseEntity, IEditable, IDeletable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public long WorksheetId { get; set; }
    public Worksheet Worksheet { get; set; } = default!;
    public int Width { get; set; }
    public int Height { get; set; }
    public int ZIndex { get; set; } = 1;
    public double X { get; set; }
    public double Y { get; set; }
    public double Rotation { get; set; } = 0;
    public ComponentType Type { get; set; }
    public string? Content { get; set; }
    public StyleProperties? Style { get; set; }
}
