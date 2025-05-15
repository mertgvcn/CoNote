using CoNote.Core.Enums;

namespace CoNote.Services.Components.Models;
public class CreateComponentRequest
{
    public long WorksheetId { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int ZIndex { get; set; } = 1;
    public double X { get; set; }
    public double Y { get; set; }
    public int Rotation { get; set; } = 0;
    public ComponentType Type { get; set; }
    public string? Content { get; set; }
    public string? Style { get; set; }
}