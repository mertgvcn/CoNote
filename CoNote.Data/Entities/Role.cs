using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class Role : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Name { get; set; } = default!;
    public long WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = default!;
    public List<Permission> Permissions { get; set; } = default!;
}
