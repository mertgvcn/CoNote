using System.Security.Claims;
using CoNote.Core.Entities;
using CoNote.SignalR.Hubs.WorksheetHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CoNote.SignalR.Hubs.WorksheetHub;

[Authorize]
public class WorksheetHub : Hub
{
    public static string HubURL => "/ws/worksheet";

    public async Task JoinWorksheet(UserConnection conn)
    {
        var worksheetId = conn.WorksheetId.ToString();
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        await Groups.AddToGroupAsync(Context.ConnectionId, worksheetId);
    }

    public async Task ComponentAdded(Component component)
    {
        var worksheetId = component.WorksheetId.ToString();

        await Clients.OthersInGroup(worksheetId)
            .SendAsync("ReceiveComponentAdded", component);
    }
}
