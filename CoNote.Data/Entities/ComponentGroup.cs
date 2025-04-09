using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class ComponentGroup : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Name { get; set; } = default!;
    public long WorksheetId { get; set; }
    public Worksheet Worksheet { get; set; } = default!;
    public List<Component> Components { get; set; } = default!;
}

