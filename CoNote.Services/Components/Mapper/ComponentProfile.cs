using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Components.Models;

namespace CoNote.Services.Components.Mapper;
public class ComponentProfile : Profile
{
    public ComponentProfile()
    {
        CreateMap<CreateComponentRequest, Component>();

        CreateMap<UpdateComponentRequest, Component>();
    }
}
