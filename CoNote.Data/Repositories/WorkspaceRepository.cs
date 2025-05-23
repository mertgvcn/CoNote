﻿using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class WorkspaceRepository : BaseRepository<Workspace>, IWorkspaceRepository
{
    private readonly CoNoteContext _context;

    public WorkspaceRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}
