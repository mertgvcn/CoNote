using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Workspace : BaseEntity, IEditable, ISoftDeletable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public bool IsPrivate { get; set; } = false;
    public List<Section> Sections { get; set; } = default!;
    public List<Worksheet> Worksheets { get; set; } = default!;
    public List<WorkspaceMember> Members { get; set; } = default!;
    public List<Invitation> Invitations { get; set; } = default!;
}
