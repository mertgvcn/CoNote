using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Sections.Interfaces;
using CoNote.Services.Sections.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class SectionController : ControllerBase
{
    private readonly ISectionService _sectionService;
    private readonly CancellationToken _cancellationToken;

    public SectionController(ISectionService sectionService, ICancellationTokenService cancellationTokenService)
    {
        _sectionService = sectionService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    public async Task<ActionResult> CreateSection([FromBody] CreateSectionRequest request)
    {
        await _sectionService.CreateSectionAsync(request, _cancellationToken);
        return Ok();
    }
}
