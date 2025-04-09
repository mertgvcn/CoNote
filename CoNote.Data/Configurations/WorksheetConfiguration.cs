using CoNote.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class WorksheetConfiguration : IEntityTypeConfiguration<Worksheet>
{
    public void Configure(EntityTypeBuilder<Worksheet> builder)
    {
    }
}
