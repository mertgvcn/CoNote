using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.WorkspaceMembers.Models;

namespace CoNote.Services.WorkspaceMembers.Mapper;
public class WorkspaceMemberProfile : Profile
{
    public WorkspaceMemberProfile()
    {
        CreateMap<AddMemberToWorkspaceRequest, WorkspaceMember>();
    }
}
