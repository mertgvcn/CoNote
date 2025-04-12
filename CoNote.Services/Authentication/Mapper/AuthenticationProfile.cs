using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Authentication.Models;

namespace CoNote.Services.Authentication.Mapper;
public class AuthenticationProfile : Profile
{
    public AuthenticationProfile()
    {
        CreateMap<UserRegisterRequest, User>();
    }
}
