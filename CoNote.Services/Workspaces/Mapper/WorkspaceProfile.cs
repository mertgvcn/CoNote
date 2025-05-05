using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Services.Workspaces.Models;
using Humanizer;

namespace CoNote.Services.Workspaces.Mapper;
public class WorkspaceProfile : Profile
{
    public WorkspaceProfile()
    {
        CreateMap<CreateWorkspaceRequest, Workspace>();

        CreateMap<Workspace, WorkspaceView>();

        CreateMap<(Workspace workspace, User user, Role role), WorkspaceMember>()
            .ForMember(dest => dest.Workspace, opt => opt.MapFrom(src => src.workspace))
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.user))
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.role))
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.user.Username))
            .ForMember(dest => dest.EditedBy, opt => opt.MapFrom(src => src.user.Username));

        CreateMap<Section, StructureView>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(_ => StructureType.Section))
            .AfterMap((src, dest) =>
            {
                dest.CreatedAtHumanized = src.CreatedAt.Humanize(culture: new System.Globalization.CultureInfo("en-US"));
            });

        CreateMap<Worksheet, StructureView>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(_ => StructureType.Worksheet))
            .AfterMap((src, dest) =>
            {
                dest.CreatedAtHumanized = src.CreatedAt.Humanize(culture: new System.Globalization.CultureInfo("en-US"));
            });

        CreateMap<WorkspaceMember, MemberView>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.Name));

        CreateMap<Invitation, InvitationView>()
            .ForMember(dest => dest.SenderFullName, opt => opt.MapFrom(src => $"{src.Sender.FirstName} {src.Sender.LastName}"))
            .ForMember(dest => dest.SenderEmail, opt => opt.MapFrom(src => src.Sender.Email))
            .ForMember(dest => dest.SenderUsername, opt => opt.MapFrom(src => src.Sender.Username))
            .ForMember(dest => dest.ReceiverFullName, opt => opt.MapFrom(src => src.Receiver != null ? $"{src.Receiver.FirstName} {src.Receiver.LastName}" : null))
            .ForMember(dest => dest.ReceiverEmail, opt => opt.MapFrom(src => src.Receiver != null ? src.Receiver.Email : null))
            .ForMember(dest => dest.ReceiverUsername, opt => opt.MapFrom(src => src.Receiver != null ? src.Receiver.Username : null))
            .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.Name));

        CreateMap<Workspace, WorkspaceSettingsView>();
    }
}
