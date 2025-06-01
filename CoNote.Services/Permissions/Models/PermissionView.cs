using CoNote.Core.Enums;

namespace CoNote.Services.Permissions.Models;
public record PermissionView
{
    public PermissionAction Action { get; init; }
    public PermissionObjectType ObjectType { get; init; }
}
