using CoNote.Core.Models;

namespace CoNote.Services.Components.Models;
public record UpdateComponentRequest
{
    public long Id { get; init; }
    public int Width { get; init; }
    public int Height { get; init; }
    public int ZIndex { get; init; }
    public double X { get; init; }
    public double Y { get; init; }
    public double Rotation { get; init; }
    public string? Content { get; init; }
    public StyleProperties? Style { get; init; }
}