namespace CoNote.Services.Workspaces.Models;
public record WorkspaceSettingsView
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}
