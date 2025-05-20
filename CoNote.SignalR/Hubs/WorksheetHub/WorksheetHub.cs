using CoNote.SignalR.Hubs.WorksheetHub.Models;
using Microsoft.AspNetCore.SignalR;

namespace CoNote.SignalR.Hubs.WorksheetHub;
public class WorksheetHub : Hub
{
    public static string HubURL => "/ws/worksheet";

    public async Task JoinWorkspace(UserConnection conn)
    {
        var worksheetId = conn.WorksheetId.ToString();
        var userId = conn.UserId.ToString();

        await Groups.AddToGroupAsync(Context.ConnectionId, worksheetId);
        await Clients.Group(userId).SendAsync("ReceiveMessage", "admin", $"User with Id {userId} has joined");
    }
}
