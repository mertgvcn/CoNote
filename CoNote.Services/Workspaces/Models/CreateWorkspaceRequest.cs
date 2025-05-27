namespace CoNote.Services.Workspaces.Models;
public record CreateWorkspaceRequest
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}
