using CoNote.Services.Worksheets.Models;

namespace CoNote.Services.Worksheets.Interfaces;
public interface IWorksheetService
{
    Task CreateWorksheetAsync(CreateWorksheetRequest request, CancellationToken cancellationToken);
}