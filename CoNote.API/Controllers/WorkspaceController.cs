﻿using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
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

    [HttpGet]
    public async Task<ActionResult<List<WorkspaceView>>> GetCurrentUserWorkspaces()
    {
        var response = await _workspaceService.GetCurrentUserWorkspacesAsync(_cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<List<StructureView>>> GetStructureByWorkspaceAndSectionId([FromQuery] long workspaceId, [FromQuery] long? sectionId)
    {
        var response = await _workspaceService.GetStructureByWorkspaceAndSectionIdAsync(workspaceId, sectionId, _cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<List<MemberView>>> GetMembersByWorkspaceId([FromQuery] long workspaceId)
    {
        var response = await _workspaceService.GetMembersByWorkspaceIdAsync(workspaceId, _cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<List<WorkspaceInvitationView>>> GetInvitationsByWorkspaceId([FromQuery] long workspaceId)
    {
        var response = await _workspaceService.GetInvitationsByWorkspaceIdAsync(workspaceId, _cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<WorkspaceSettingsView>> GetSettingsByWorkspaceId([FromQuery] long workspaceId)
    {
        var response = await _workspaceService.GetSettingsByWorkspaceIdAsync(workspaceId, _cancellationToken);
        return response;
    }

    [HttpGet]
    public async Task<ActionResult<List<RoleView>>> GetRolesByWorkspaceId([FromQuery] long workspaceId)
    {
        var response = await _workspaceService.GetRolesByWorkspaceIdAsync(workspaceId, _cancellationToken);
        return response;
    }

    [HttpPost]
    public async Task<ActionResult> CreateWorkspace([FromBody] CreateWorkspaceRequest request)
    {
        await _workspaceService.CreateWorkspaceAsync(request, _cancellationToken);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<List<WorkspaceView>>> SearchWorkspacesByName([FromQuery] string searchValue, [FromQuery] int? limit)
    {
        var response = await _workspaceService.SearchWorkspacesByNameAsync(searchValue, limit, _cancellationToken);
        return response;
    }
}
