﻿using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class AuditLog : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Object { get; set; } = default!;
    public string Mutation { get; set; } = default!;
    public DateTime TimeStamp { get; } = DateTime.Now;
    public string OldObjectValue { get; set; } = default!;
}
