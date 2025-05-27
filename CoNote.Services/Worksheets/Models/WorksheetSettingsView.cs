namespace CoNote.Services.Worksheets.Models;
public record WorksheetSettingsView
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
}
