namespace CoNote.Services.Workspaces.Models;
public record WorkspaceView
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}
