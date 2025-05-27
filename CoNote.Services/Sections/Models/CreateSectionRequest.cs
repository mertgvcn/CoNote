namespace CoNote.Services.Sections.Models;
public class CreateSectionRequest
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public long WorkspaceId { get; set; }
    public long? ParentId { get; set; }
}
