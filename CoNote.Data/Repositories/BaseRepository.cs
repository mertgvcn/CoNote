using CoNote.Core.Entities.Common;
using CoNote.Core.Exceptions;
using CoNote.Data.Context;
using CoNote.Data.Entities.Common;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
{
    private readonly CoNoteContext _context;

    protected BaseRepository(CoNoteContext context)
    {
        _context = context;
    }

    public IQueryable<T> GetAll()
    {
        return _context.Set<T>().AsQueryable();
    }

    public IQueryable<T> GetById(long id)
    {
        return GetAll().Where(x => x.Id == id);
    }

    public async Task<T> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return (await _context.Set<T>().FindAsync(id, cancellationToken))!;
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        var entry = await _context.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return entry.Entity;
    }

    public async Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    {
        await _context.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        if (entity is IEditable)
            _context.Attach(entity);
        else
            throw new Exception("This entity cannot be modified.");

        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default)
    {
        foreach (var entity in entities)
        {
            if (entity is IEditable)
                _context.Attach(entity);
            else
                throw new Exception("One or more entities cannot be modified.");
        }

        _context.UpdateRange(entities);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(long id, CancellationToken cancellationToken = default)
    {
        await DeleteAsync(await GetByIdAsync(id, cancellationToken));
    }

    public async Task DeleteAsync(T entity, CancellationToken cancellationToken = default)
    {
        if (entity is ISoftDeletable)
        {
            var softDeletableEntity = (ISoftDeletable)entity;
            softDeletableEntity.IsDeleted = true;
        }
        else if (entity is IDeletable)
            _context.Remove(entity);
        else
            throw new UndeletableEntityException();

        await _context.SaveChangesAsync(cancellationToken);
    }
}
