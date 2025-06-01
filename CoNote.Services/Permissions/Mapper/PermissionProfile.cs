using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Permissions.Models;

namespace CoNote.Services.Permissions.Mapper;
public class PermissionProfile : Profile
{
    public PermissionProfile()
    {
        CreateMap<Permission, PermissionView>();
    }
}
