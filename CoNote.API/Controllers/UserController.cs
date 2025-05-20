using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Users.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Authorize]
[Route("api/[controller]/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly CancellationToken _cancellationToken;

    public UserController(IUserService userService, ICancellationTokenService cancellationTokenService)
    {
        _userService = userService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpGet]
    public async Task<ActionResult<List<SearchedUserView>>> SearchUsersByUsername([FromQuery] string searchValue, [FromQuery] int? limit)
    {
        var response = await _userService.SearchUsersByUsernameAsync(searchValue, limit, _cancellationToken);
        return response;
    }
}
