using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Invitations.Interfaces;
using CoNote.Services.Invitations.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class InvitationController : ControllerBase
{
    private readonly IInvitationService _invitationService;
    private readonly CancellationToken _cancellationToken;

    public InvitationController(IInvitationService invitationService, ICancellationTokenService cancellationTokenService)
    {
        _invitationService = invitationService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    public async Task<ActionResult> SendInvitation([FromBody] SendInvitationRequest request)
    {
        await _invitationService.SendInvitationAsync(request, _cancellationToken);
        return Ok();
    }

    [HttpDelete()]
    public async Task<ActionResult> DeleteInvitation([FromQuery] long invitationId)
    {
        await _invitationService.DeleteInvitationAsync(invitationId, _cancellationToken);
        return Ok();
    }
}
