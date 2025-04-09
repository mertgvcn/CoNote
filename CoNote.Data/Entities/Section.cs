using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Section : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public long WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = default!;
    public long? ParentId { get; set; }
    public Section? Parent { get; set; } = default!;
    public List<Section> Children { get; set; } = default!;
    public List<Worksheet> Worksheets { get; set; } = default!;
}
