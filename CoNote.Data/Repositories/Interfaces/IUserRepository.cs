using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IUserRepository : IBaseRepository<User>
{
    Task<bool> UserExistsByEmailAsync(string email, CancellationToken cancellationToken);
    Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
    Task<bool> UserExistsByUsernameAsync(string username, CancellationToken cancellationToken);
    Task<User?> GetUserByUsernameAsync(string username, CancellationToken cancellationToken);
}
