using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Notifications.Models;
using Humanizer;

namespace CoNote.Services.Notifications.Mapper;
public class NotificationProfile : Profile
{
    public NotificationProfile()
    {
        CreateMap<CreateNotificationRequest, Notification>();

        CreateMap<Notification, NotificationView>()
            .AfterMap((src, dest) =>
            {
                dest.CreatedAtHumanized = src.CreatedAt.Humanize(culture: new System.Globalization.CultureInfo("en-US"));
            });
    }
}
