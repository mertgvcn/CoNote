using CoNote.Core.Entities;
using CoNote.Core.Enums;

namespace CoNote.Data.Seeds;
public static class PermissionSeedData
{
    public static List<Permission> GetPermissions()
    {
        return new List<Permission>
        {
            //Workspace
            new Permission
            {
                Id = 1,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Workspace,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Structure
            new Permission
            {
                Id = 2,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Structure,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 3,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Structure,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 4,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Structure,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 5,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Structure,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Members
            new Permission
            {
                Id = 6,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Members,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 7,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Members,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 8,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Members,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 9,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Members,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Invitations
            new Permission
            {
                Id = 10,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Invitations,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 11,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Invitations,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 12,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Invitations,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 13,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Invitations,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Settings
            new Permission
            {
                Id = 14,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Settings,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 15,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Settings,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Worksheet
            new Permission
            {
                Id = 16,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Worksheet,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 17,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Worksheet,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 18,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Worksheet,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 19,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Worksheet,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Section
            new Permission
            {
                Id = 20,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Section,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 21,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Section,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 22,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Section,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            //Component
            new Permission
            {
                Id = 23,
                Action = PermissionAction.View,
                ObjectType = PermissionObjectType.Component,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 24,
                Action = PermissionAction.Add,
                ObjectType = PermissionObjectType.Component,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 25,
                Action = PermissionAction.Edit,
                ObjectType = PermissionObjectType.Component,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
            new Permission
            {
                Id = 26,
                Action = PermissionAction.Delete,
                ObjectType = PermissionObjectType.Component,
                CreatedBy = "System",
                CreatedAt = DateTime.Now,
                EditedBy = "System",
                EditedAt = DateTime.Now,
            },
        };
    }
}
