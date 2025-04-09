using CoNote.Infrastructure.Utilities.HttpContext;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Token;
using CoNote.Infrastructure.Utilities.Token.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace CoNote.Infrastructure;

public static class Registration
{
    public static void RegisterInfrastructure(this IServiceCollection services)
    {
        AddServices(services);
    }

    private static void AddServices(IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IHttpContextService, HttpContextService>();
    }
}
