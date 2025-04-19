using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface ISectionRepository : IBaseRepository<Section>
{
    Task<bool> SectionExistsByIdAsync(long id, CancellationToken cancellationToken);
}
