using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class WorksheetStyle : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public long WorksheetId { get; set; }
    public Worksheet Worksheet { get; set; } = default!;
    public long StyleId { get; set; }
    public Style Style { get; set; } = default!;
    public string Name { get; set; } = default!;
}
