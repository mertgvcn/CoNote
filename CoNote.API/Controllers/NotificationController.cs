using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Notifications.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class NotificationController : ControllerBase
{
    private readonly INotificationService _notificationService;
    private readonly CancellationToken _cancellationToken;

    public NotificationController(INotificationService notificationService, ICancellationTokenService cancellationTokenService)
    {
        _notificationService = notificationService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpGet]
    public async Task<ActionResult<List<NotificationView>>> GetCurrentUserNotifications()
    {
        var response = await _notificationService.GetCurrentUserNotificationsAsync(_cancellationToken);
        return response;
    }

    [HttpPost]
    public async Task<ActionResult<List<long>>> MarkNotificationsAsRead([FromBody] MarkNotificationsAsReadRequest request)
    {
        var response = await _notificationService.MarkNotificationsAsReadAsync(request, _cancellationToken);
        return response;
    }

    [HttpDelete]
    public async Task<ActionResult<long>> DeleteNotification([FromQuery] long notificationId)
    {
        var response = await _notificationService.DeleteNotificationById(notificationId, _cancellationToken);
        return response;
    }
}
