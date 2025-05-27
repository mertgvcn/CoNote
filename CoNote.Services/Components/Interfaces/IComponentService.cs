using CoNote.Core.Entities;
using CoNote.Services.Components.Models;

namespace CoNote.Services.Components.Interfaces;
public interface IComponentService
{
    Task<List<Component>> GetComponentsByWorksheetIdAsync(long worksheetId, CancellationToken cancellationToken);
    Task<Component> CreateComponentAsync(CreateComponentRequest request, CancellationToken cancellationToken);
    Task<Component> UpdateComponentAsync(UpdateComponentRequest request, CancellationToken cancellationToken);
    Task<long> DeleteComponentAsync(long componentId, CancellationToken cancellationToken);
}