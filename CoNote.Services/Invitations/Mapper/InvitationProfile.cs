using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Invitations.Models;
using Humanizer;

namespace CoNote.Services.Invitations.Mapper;
public class InvitationProfile : Profile
{
    public InvitationProfile()
    {
        CreateMap<SendInvitationRequest, Invitation>();

        CreateMap<Invitation, InvitationView>()
            .ForMember(dest => dest.WorkspaceName, opt => opt.MapFrom(src => src.Workspace.Name))
            .ForMember(dest => dest.SenderFullName, opt => opt.MapFrom(src => $"{src.Sender.FirstName} {src.Sender.LastName}"))
            .ForMember(dest => dest.SenderEmail, opt => opt.MapFrom(src => src.Sender.Email))
            .ForMember(dest => dest.SenderUsername, opt => opt.MapFrom(src => src.Sender.Username))
            .ForMember(dest => dest.ReceiverFullName, opt => opt.MapFrom(src => src.Receiver != null ? $"{src.Receiver.FirstName} {src.Receiver.LastName}" : null))
            .ForMember(dest => dest.ReceiverEmail, opt => opt.MapFrom(src => src.Receiver != null ? src.Receiver.Email : null))
            .ForMember(dest => dest.ReceiverUsername, opt => opt.MapFrom(src => src.Receiver != null ? src.Receiver.Username : null))
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.Name))
            .AfterMap((src, dest) =>
            {
                dest.CreatedAtHumanized = src.CreatedAt.Humanize(culture: new System.Globalization.CultureInfo("en-US"));
            });
    }
}
