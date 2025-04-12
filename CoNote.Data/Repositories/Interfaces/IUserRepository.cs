using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IUserRepository : IBaseRepository<User>
{
    Task<bool> UserExistsByEmailAsync(string email, CancellationToken cancellationToken);
    Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
}
