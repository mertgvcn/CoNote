﻿namespace CoNote.Data.Repositories.Interfaces;
public interface IBaseRepository<T> where T : class
{
    IQueryable<T> GetAll();
    IQueryable<T> GetById(long id);
    Task<T> GetByIdAsync(long id, CancellationToken cancellationToken = default);
    Task<T> AddAsync(T Entity, CancellationToken cancellationToken = default);
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);
    Task UpdateAsync(T Entity, CancellationToken cancellationToken = default);
    Task UpdateRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);
    Task DeleteAsync(long id, CancellationToken cancellationToken = default);
    Task DeleteAsync(T Entity, CancellationToken cancellationToken = default);
}
