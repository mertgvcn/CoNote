using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Worksheets.Models;

namespace CoNote.Services.Worksheets.Mapper;
public class WorksheetProfile : Profile
{
    public WorksheetProfile()
    {
        CreateMap<CreateWorksheetRequest, Worksheet>();
    }
}
