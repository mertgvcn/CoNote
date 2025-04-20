using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Workspaces.Models;

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
    }
}
