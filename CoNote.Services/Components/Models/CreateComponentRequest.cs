using CoNote.Core.Enums;
using CoNote.Core.Models;

namespace CoNote.Services.Components.Models;
public class CreateComponentRequest
{
    public long WorksheetId { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int ZIndex { get; set; } = 1;
    public double X { get; set; }
    public double Y { get; set; }
    public double Rotation { get; set; } = 0;
    public ComponentType Type { get; set; }
    public string? Content { get; set; }
    public StyleProperties? Style { get; set; }
}