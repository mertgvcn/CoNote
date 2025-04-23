using CoNote.Services.Sections.Models;

namespace CoNote.Services.Sections.Interfaces;
public interface ISectionService
{
    Task CreateSectionAsync(CreateSectionRequest request, CancellationToken cancellationToken);
    Task<List<SectionTreeViewModel>> GetSectionTreeByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken);
}
