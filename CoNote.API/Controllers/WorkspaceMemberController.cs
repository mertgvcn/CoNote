using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.WorkspaceMembers.Interfaces;
using CoNote.Services.WorkspaceMembers.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class WorkspaceMemberController : ControllerBase
{
    private readonly IWorkspaceMemberService _workspaceMemberService;
    private readonly CancellationToken _cancellationToken;

    public WorkspaceMemberController(IWorkspaceMemberService workspaceMemberService, ICancellationTokenService cancellationTokenService)
    {
        _workspaceMemberService = workspaceMemberService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    public async Task<ActionResult> AddMemberToWorkspace([FromBody] AddMemberToWorkspaceRequest request)
    {
        await _workspaceMemberService.AddMemberToWorkspaceAsync(request, _cancellationToken);
        return Ok();
    }
}
