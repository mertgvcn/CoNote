using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Worksheets.Interfaces;
using CoNote.Services.Worksheets.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class WorksheetController : ControllerBase
{
    private readonly IWorksheetService _worksheetService;
    private readonly CancellationToken _cancellationToken;

    public WorksheetController(IWorksheetService worksheetService, ICancellationTokenService cancellationTokenService)
    {
        _worksheetService = worksheetService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    public async Task<ActionResult> CreateWorksheet([FromBody] CreateWorksheetRequest request)
    {
        await _worksheetService.CreateWorksheetAsync(request, _cancellationToken);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<WorksheetSettingsView>> GetSettingsByWorksheetId([FromQuery] long worksheetId)
    {
        var response = await _worksheetService.GetSettingsByWorksheetIdAsync(worksheetId, _cancellationToken);
        return response;
    }
}
