using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Sections.Models;

namespace CoNote.Services.Sections.Mapper;
public class SectionProfile: Profile
{
    public SectionProfile()
    {
        CreateMap<CreateSectionRequest, Section>();
    }
}
