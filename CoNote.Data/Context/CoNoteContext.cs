using System.Reflection;
using System.Text.Json;
using CoNote.Core.Entities;
using CoNote.Core.Entities.Common;
using CoNote.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Data.Context;
public class CoNoteContext : DbContext
{
    public CoNoteContext(DbContextOptions<CoNoteContext> options) : base(options)
    {

    }

    public DbSet<AuditLog> AuditLogs { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Component> Components { get; set; }
    public DbSet<Invitation> Invitations { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Worksheet> Worksheets { get; set; }
    public DbSet<Workspace> Workspaces { get; set; }
    public DbSet<WorkspaceMember> WorkspaceMembers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override int SaveChanges()
    {
        throw new InvalidOperationException("Use SaveChangesAsync");
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        var ChangedObjects = ChangeTracker.Entries().Where(a => a.State == EntityState.Modified || a.State == EntityState.Added || a.State == EntityState.Deleted).ToList();
        foreach (var entity in ChangedObjects)
        {
            if (entity is IAuditable)
            {
                Add(new AuditLog()
                {
                    CreatedAt = DateTime.UtcNow,
                    Mutation = entity.State.ToString(),
                    Name = "Add User Name",
                    Object = entity.ToString(),
                    OldObjectValue = JsonSerializer.Serialize(entity)
                });
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
