using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Permissions.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class PermissionController : ControllerBase
{
    private readonly IPermissionService _permissionService;
    private readonly CancellationToken _cancellationToken;

    public PermissionController(IPermissionService permissionService, ICancellationTokenService cancellationTokenService)
    {
        _permissionService = permissionService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpGet]
    public async Task<ActionResult<List<PermissionView>>> GetCurrentUserPermissionsByWorkspaceId([FromQuery] long workspaceId)
    {
        var response = await _permissionService.GetCurrentUserPermissionsByWorkspaceIdAsync(workspaceId, _cancellationToken);
        return response;
    }
}
