namespace CoNote.Services.Workspaces.Models;
public record RoleView
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
}
