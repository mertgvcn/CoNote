using System.Reflection;
using CoNote.Services.Authentication;
using CoNote.Services.Authentication.Interfaces;
using CoNote.Services.Components;
using CoNote.Services.Components.Interfaces;
using CoNote.Services.Invitations;
using CoNote.Services.Invitations.Interfaces;
using CoNote.Services.Notifications;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Permissions;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Roles;
using CoNote.Services.Roles.Interfaces;
using CoNote.Services.Sections;
using CoNote.Services.Sections.Interfaces;
using CoNote.Services.Users;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Worksheets;
using CoNote.Services.Worksheets.Interfaces;
using CoNote.Services.WorkspaceMembers;
using CoNote.Services.WorkspaceMembers.Interfaces;
using CoNote.Services.Workspaces;
using CoNote.Services.Workspaces.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CoNote.Services;

public static class Registration
{
    public static void RegisterServices(this IServiceCollection services)
    {
        AddServices(services);
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }

    private static void AddServices(IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IComponentService, ComponentService>();
        services.AddScoped<IInvitationService, InvitationService>();
        services.AddScoped<INotificationService, NotificationService>();
        services.AddScoped<IPermissionService, PermissionService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<ISectionService, SectionService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IWorksheetService, WorksheetService>();
        services.AddScoped<IWorkspaceMemberService, WorkspaceMemberService>();
        services.AddScoped<IWorkspaceService, WorkspaceService>();
    }
}
