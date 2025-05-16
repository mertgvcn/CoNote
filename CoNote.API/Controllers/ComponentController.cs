using CoNote.Core.Entities;
using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Components.Interfaces;
using CoNote.Services.Components.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]

public class ComponentController : ControllerBase
{
    private readonly IComponentService _componentService;
    private readonly CancellationToken _cancellationToken;

    public ComponentController(IComponentService componentService, ICancellationTokenService cancellationTokenService)
    {
        _componentService = componentService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpGet]
    public async Task<ActionResult<List<Component>>> GetComponentsByWorksheetId(long worksheetId)
    {
        var response = await _componentService.GetComponentsByWorksheetIdAsync(worksheetId, _cancellationToken);
        return response;
    }

    [HttpPost]
    public async Task<ActionResult<Component>> CreateComponent([FromBody] CreateComponentRequest request)
    {
        var response = await _componentService.CreateComponentAsync(request, _cancellationToken);
        return response;
    }
}
