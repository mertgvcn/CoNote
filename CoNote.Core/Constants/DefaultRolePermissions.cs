using CoNote.Core.Enums;

namespace CoNote.Core.Constants;
public static class DefaultRolePermissions
{
    public static readonly Dictionary<string, List<(PermissionAction Action, PermissionObjectType ObjectType)>> RolePermissionMap = new()
    {
        {
            DefaultRoleNames.Owner, new List<(PermissionAction, PermissionObjectType)>
            {
                (PermissionAction.Delete, PermissionObjectType.Workspace),
                (PermissionAction.View, PermissionObjectType.Structure),
                (PermissionAction.Add, PermissionObjectType.Structure),
                (PermissionAction.Edit, PermissionObjectType.Structure),
                (PermissionAction.Delete, PermissionObjectType.Structure),
                (PermissionAction.View, PermissionObjectType.Members),
                (PermissionAction.Add, PermissionObjectType.Members),
                (PermissionAction.Edit, PermissionObjectType.Members),
                (PermissionAction.Delete, PermissionObjectType.Members),
                (PermissionAction.View, PermissionObjectType.Invitations),
                (PermissionAction.Add, PermissionObjectType.Invitations),
                (PermissionAction.Edit, PermissionObjectType.Invitations),
                (PermissionAction.Delete, PermissionObjectType.Invitations),
                (PermissionAction.View, PermissionObjectType.Settings),
                (PermissionAction.Edit, PermissionObjectType.Settings),
                (PermissionAction.View, PermissionObjectType.Worksheet),
                (PermissionAction.Add, PermissionObjectType.Worksheet),
                (PermissionAction.Edit, PermissionObjectType.Worksheet),
                (PermissionAction.Delete, PermissionObjectType.Worksheet),
                (PermissionAction.Add, PermissionObjectType.Section),
                (PermissionAction.Edit, PermissionObjectType.Section),
                (PermissionAction.Delete, PermissionObjectType.Section),
                (PermissionAction.View, PermissionObjectType.Component),
                (PermissionAction.Add, PermissionObjectType.Component),
                (PermissionAction.Edit, PermissionObjectType.Component),
                (PermissionAction.Delete, PermissionObjectType.Component),
            }
        },
        {
            DefaultRoleNames.Editor, new List<(PermissionAction, PermissionObjectType)>
            {
                (PermissionAction.View, PermissionObjectType.Structure),
                (PermissionAction.Add, PermissionObjectType.Structure),
                (PermissionAction.Edit, PermissionObjectType.Structure),
                (PermissionAction.Delete, PermissionObjectType.Structure),
                (PermissionAction.View, PermissionObjectType.Members),
                (PermissionAction.Add, PermissionObjectType.Members),
                (PermissionAction.View, PermissionObjectType.Invitations),
                (PermissionAction.Add, PermissionObjectType.Invitations),
                (PermissionAction.Edit, PermissionObjectType.Invitations),
                (PermissionAction.View, PermissionObjectType.Settings),
                (PermissionAction.View, PermissionObjectType.Worksheet),
                (PermissionAction.Add, PermissionObjectType.Worksheet),
                (PermissionAction.Edit, PermissionObjectType.Worksheet),
                (PermissionAction.Delete, PermissionObjectType.Worksheet),
                (PermissionAction.Add, PermissionObjectType.Section),
                (PermissionAction.Edit, PermissionObjectType.Section),
                (PermissionAction.Delete, PermissionObjectType.Section),
                (PermissionAction.View, PermissionObjectType.Component),
                (PermissionAction.Add, PermissionObjectType.Component),
                (PermissionAction.Edit, PermissionObjectType.Component),
                (PermissionAction.Delete, PermissionObjectType.Component),
            }
        },
        {
            DefaultRoleNames.Viewer, new List<(PermissionAction, PermissionObjectType)>
            {
                (PermissionAction.View, PermissionObjectType.Structure),
                (PermissionAction.View, PermissionObjectType.Members),
                (PermissionAction.View, PermissionObjectType.Invitations),
                (PermissionAction.View, PermissionObjectType.Settings),
                (PermissionAction.View, PermissionObjectType.Worksheet),
                (PermissionAction.View, PermissionObjectType.Section),
                (PermissionAction.View, PermissionObjectType.Component),
            }
        }
    };
}
