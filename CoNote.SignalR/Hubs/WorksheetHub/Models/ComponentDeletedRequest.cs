namespace CoNote.SignalR.Hubs.WorksheetHub.Models;
public record ComponentDeletedRequest
{
    public long WorksheetId { get; set; }
    public long ComponentId { get; set; }
}
