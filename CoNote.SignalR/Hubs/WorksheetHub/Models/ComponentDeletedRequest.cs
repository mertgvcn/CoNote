namespace CoNote.SignalR.Hubs.WorksheetHub.Models;
public record ComponentDeletedRequest
{
    public long WorksheetId { get; init; }
    public long ComponentId { get; init; }
}
