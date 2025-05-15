using CoNote.Core.Entities;
using CoNote.Services.Components.Models;

namespace CoNote.Services.Components.Interfaces;
public interface IComponentService
{
    Task<Component> CreateComponentAsync(CreateComponentRequest request, CancellationToken cancellationToken);
}