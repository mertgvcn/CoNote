namespace CoNote.Services.Worksheets.Models;
public record CreateWorksheetRequest
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public long WorkspaceId { get; set; }
    public long? SectionId { get; set; }
}
