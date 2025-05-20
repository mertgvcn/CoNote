using Microsoft.Extensions.DependencyInjection;

namespace CoNote.SignalR;
public static class Registration
{
    public static void RegisterSignalR(this IServiceCollection services)
    {
        services.AddSignalR();
    }
}
