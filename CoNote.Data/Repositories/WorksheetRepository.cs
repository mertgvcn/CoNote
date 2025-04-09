﻿using CoNote.Core.Entities;
using CoNote.Data.Context;
using CoNote.Data.Repositories.Interfaces;

namespace CoNote.Data.Repositories;
public sealed class WorksheetRepository : BaseRepository<Worksheet>, IWorksheetRepository
{
    private readonly CoNoteContext _context;

    public WorksheetRepository(CoNoteContext context) : base(context)
    {
        _context = context;
    }
}


