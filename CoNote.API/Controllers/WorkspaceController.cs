using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Workspaces.Interfaces;
using CoNote.Services.Workspaces.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class WorkspaceController : ControllerBase
{
    private readonly IWorkspaceService _workspaceService;
    private readonly CancellationToken _cancellationToken;

    public WorkspaceController(IWorkspaceService workspaceService, ICancellationTokenService cancellationTokenService)
    {
        _workspaceService = workspaceService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    public async Task<ActionResult> CreateWorkspace([FromBody] CreateWorkspaceRequest request)
    {
        await _workspaceService.CreateWorkspaceAsync(request, _cancellationToken);
        return Ok();
    }
}
