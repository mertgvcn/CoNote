using CoNote.Core.Entities;
using CoNote.Services.Users.Models;

namespace CoNote.Services.Users.Interfaces;
public interface IUserService
{
    Task<List<SearchedUserView>> SearchUsersByUsernameAsync(string searchValue, int? limit, CancellationToken cancellationToken);
    Task<User> GetCurrentUserAsync(CancellationToken cancellationToken);
}