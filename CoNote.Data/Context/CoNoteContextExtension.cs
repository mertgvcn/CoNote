using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CoNote.Data.Context;
public static class CoNoteContextExtension
{
    public static IHost AutoMigrateDatabase(this IHost app)
    {
        using var scope = app.Services.GetService<IServiceScopeFactory>()!.CreateScope();

        using var context = scope.ServiceProvider.GetRequiredService<CoNoteContext>();

        var pendingMigrations = context.Database.GetPendingMigrations();

        if (pendingMigrations.Any())
        {
            var originalTimeOut = context.Database.GetCommandTimeout();
            context.Database.SetCommandTimeout(30 * 60);
            context.Database.Migrate();
            context.Database.SetCommandTimeout(originalTimeOut);
        }

        return app;
    }
}
