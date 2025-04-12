using System.Reflection;
using CoNote.Services.Authentication;
using CoNote.Services.Authentication.Interfaces;
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
    }
}
