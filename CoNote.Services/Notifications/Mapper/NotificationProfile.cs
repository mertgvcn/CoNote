using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Notifications.Models;

namespace CoNote.Services.Notifications.Mapper;
public class NotificationProfile : Profile
{
    public NotificationProfile()
    {
        CreateMap<CreateNotificationRequest, Notification>();
    }
}
