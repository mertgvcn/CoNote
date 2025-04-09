using System.Security.Claims;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using Microsoft.AspNetCore.Http;

namespace CoNote.Infrastructure.Utilities.HttpContext;
public class HttpContextService : IHttpContextService
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public HttpContextService(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public long GetCurrentUserId()
    {
        if (httpContextAccessor.HttpContext is not null)
        {
            var userID = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userID != null)
                return long.Parse(userID);
        }

        return -1;
    }
}
