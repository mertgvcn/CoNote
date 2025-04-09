using CoNote.Data.Context;
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
        //services.AddScoped<IStudentRepository, StudentRepository>();
    }
}
