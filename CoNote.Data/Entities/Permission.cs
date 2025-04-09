using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;

namespace CoNote.Core.Entities;
public sealed class Permission : BaseEntity, IEditable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public string Name => $"{Action}:{ObjectType}";
    public PermissionAction Action { get; set; }
    public PermissionObjectType ObjectType { get; set; }
    public List<Role> Roles { get; set; } = default!;
}
