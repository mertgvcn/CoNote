using CoNote.Data.Context;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace CoNote.Infrastructure.Utilities.Transaction;
public class TransactionService : ITransactionService
{
    private readonly CoNoteContext _context;

    public TransactionService(CoNoteContext context)
    {
        _context = context;
    }

    public async Task<IDbContextTransaction> CreateTransactionAsync(CancellationToken cancellationToken)
    {
        return await _context.Database.BeginTransactionAsync(cancellationToken);
    }
}
