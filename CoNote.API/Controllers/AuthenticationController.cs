using CoNote.Infrastructure.Utilities.Cancellation.Interfaces;
using CoNote.Services.Authentication.Interfaces;
using CoNote.Services.Authentication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoNote.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly CancellationToken _cancellationToken;

    public AuthenticationController(IAuthenticationService authenticationService, ICancellationTokenService cancellationTokenService)
    {
        _authenticationService = authenticationService;
        _cancellationToken = cancellationTokenService.CancellationToken;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<UserLoginResponse>> Login([FromBody] UserLoginRequest request)
    {
        return Ok(await _authenticationService.LoginUserAsync(request, _cancellationToken));
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> Register([FromBody] UserRegisterRequest request)
    {
        await _authenticationService.RegisterUserAsync(request, _cancellationToken);
        return Ok();
    }
}
