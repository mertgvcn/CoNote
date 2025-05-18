using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Services.Invitations.Models;

namespace CoNote.Services.Invitations.Mapper;
public class InvitationProfile : Profile
{
    public InvitationProfile()
    {
        CreateMap<SendInvitationRequest, Invitation>();
    }
}
