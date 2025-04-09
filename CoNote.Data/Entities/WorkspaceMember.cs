using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class WorkspaceMember : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public long WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = default!;
    public long UserId { get; set; }
    public User User { get; set; } = default!;
    public long RoleId { get; set; }
    public Role Role { get; set; } = default!;
}
