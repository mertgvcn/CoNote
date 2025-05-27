using CoNote.Core.Enums;

namespace CoNote.Services.Workspaces.Models;
public record StructureView
{
    public long Id { get; set; }
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatedAtHumanized { get; set; } = default!;
    public StructureType Type { get; set; }
}
