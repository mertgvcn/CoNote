using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Services.Notifications.Interfaces;
using CoNote.Services.Notifications.Models;

namespace CoNote.Services.Notifications;
public class NotificationService : INotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public NotificationService(
        INotificationRepository notificationRepository,
        IHttpContextService httpContextService,
        IMapper mapper)
    {
        _notificationRepository = notificationRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task CreateNotificationAsync(CreateNotificationRequest request, CancellationToken cancellationToken)
    {
        var notification = _mapper.Map<Notification>(request);

        await _notificationRepository.AddAsync(notification);
    }
}
