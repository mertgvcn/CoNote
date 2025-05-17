using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Users.Models;

namespace CoNote.Services.Users.Mapper;
public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, SearchedUserView>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));
    }
}
