using AutoMapper;
using CoNote.Core.Exceptions;
using CoNote.Data.Entities;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Notifications.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Notifications;
public class NotificationService : INotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public NotificationService(
        INotificationRepository notificationRepository,
        IUserRepository userRepository,
        IHttpContextService httpContextService,
        IMapper mapper)
    {
        _notificationRepository = notificationRepository;
        _userRepository = userRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task CreateNotificationAsync(CreateNotificationRequest request, CancellationToken cancellationToken)
    {
        var notification = _mapper.Map<Notification>(request);
        notification.EditedBy = request.CreatedBy!;

        await _notificationRepository.AddAsync(notification);
    }

    public async Task<List<NotificationView>> GetCurrentUserNotificationsAsync(CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var user = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var notifications = await _notificationRepository.GetListByUserId(currentUserId)
            .ToListAsync(cancellationToken);

        var notificationViews = _mapper.Map<List<NotificationView>>(notifications);

        return notificationViews;
    }

    public async Task<List<long>> MarkNotificationsAsReadAsync(MarkNotificationsAsReadRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var user = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var notifications = await _notificationRepository.GetListByUserId(currentUserId)
            .Where(n => request.NotificationIds.Contains(n.Id))
            .ToListAsync(cancellationToken);

        foreach (var notification in notifications)
        {
            notification.IsRead = true;
        }

        await _notificationRepository.UpdateRangeAsync(notifications, cancellationToken);
        return request.NotificationIds;
    }

    public async Task<long> DeleteNotificationById(long notificationId, CancellationToken cancellationToken)
    {
        await _notificationRepository.DeleteAsync(notificationId, cancellationToken);
        return notificationId;
    }
}
