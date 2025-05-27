namespace CoNote.Services.Sections.Models;
public record SectionTreeViewModel
{
    public long Id { get; set; }
    public string Label { get; set; } = default!;
    public List<SectionTreeViewModel> Children { get; set; } = new();
}
