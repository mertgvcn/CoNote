using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Sections.Models;

namespace CoNote.Services.Sections.Mapper;
public class SectionProfile : Profile
{
    public SectionProfile()
    {
        CreateMap<CreateSectionRequest, Section>();

        CreateMap<Section, SectionTreeViewModel>()
            .ForMember(dest => dest.Children, opt => opt.MapFrom(src => src.Children))
            .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Name));
    }
}
