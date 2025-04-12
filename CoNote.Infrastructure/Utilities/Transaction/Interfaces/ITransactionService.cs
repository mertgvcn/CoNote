using Microsoft.EntityFrameworkCore.Storage;

namespace CoNote.Infrastructure.Utilities.Transaction.Interfaces;
public interface ITransactionService
{
    Task<IDbContextTransaction> CreateTransactionAsync(CancellationToken cancellationToken);
}