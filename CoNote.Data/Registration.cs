using CoNote.Data.Context;
using CoNote.Data.Repositories;
using CoNote.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CoNote.Data;

public static class Registration
{
    public static void RegisterData(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CoNoteContext>(opt =>
            opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        AddDbSettings();
        AddRepositories(services);
    }

    public static void AddDbSettings()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<IAuditLogRepository, AuditLogRepository>();
        services.AddScoped<ICommentRepository, CommentRepository>();
        services.AddScoped<IComponentRepository, ComponentRepository>();
        services.AddScoped<IInvitationRepository, InvitationRepository>();
        services.AddScoped<INotificationRepository, NotificationRepository>();
        services.AddScoped<IPermissionRepository, PermissionRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<ISectionRepository, SectionRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IWorksheetRepository, WorksheetRepository>();
        services.AddScoped<IWorkspaceMemberRepository, WorkspaceMemberRepository>();
        services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
    }
}
