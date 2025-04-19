using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Workspaces.Models;

namespace CoNote.Services.Workspaces.Mapper;
public class WorkspaceProfile : Profile
{
    public WorkspaceProfile()
    {
        CreateMap<CreateWorkspaceRequest, Workspace>();
    }
}
