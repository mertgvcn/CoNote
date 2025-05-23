using CoNote.Core.Entities;

namespace CoNote.SignalR.Hubs.WorksheetHub.Models;
public record ComponentUpdatedRequest
{
    public long WorksheetId { get; init; }
    public Component Component { get; init; } = default!;
}
