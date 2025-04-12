namespace CoNote.Infrastructure.Utilities.Cancellation.Interfaces;

public interface ICancellationTokenService
{
    CancellationToken CancellationToken { get; }
    void Cancel();
    void Dispose();
    void Register(CancellationToken cancellationToken);
}
