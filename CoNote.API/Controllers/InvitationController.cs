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

    [HttpDelete]
    public async Task<ActionResult<long>> DeleteInvitation([FromQuery] long invitationId)
    {
        var response = await _invitationService.DeleteInvitationAsync(invitationId, _cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<List<InvitationView>>> GetCurrentUserInvitations()
    {
        var response = await _invitationService.GetCurrentUserInvitationsAsync(_cancellationToken);
        return response;
    }

    [HttpPost]
    public async Task<ActionResult> UpdateInvitationStatus([FromBody] UpdateInvitationStatusRequest request)
    {
        await _invitationService.UpdateInvitationStatusAsync(request, _cancellationToken);
        return Ok();
    }
}
