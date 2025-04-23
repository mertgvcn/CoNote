using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Worksheet : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public long WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = default!;
    public long? SectionId { get; set; }
    public Section? Section { get; set; } = default!;
    public List<Component> Components { get; set; } = default!;
    public List<ComponentGroup> ComponentGroups { get; set; } = default!;
    public List<WorksheetStyle> WorksheetStyles { get; set; } = default!;
    public List<Comment> Comments { get; set; } = default!;
}
