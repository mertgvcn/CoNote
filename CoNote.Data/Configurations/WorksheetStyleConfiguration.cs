using CoNote.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class WorksheetStyleConfiguration : IEntityTypeConfiguration<WorksheetStyle>
{
    public void Configure(EntityTypeBuilder<WorksheetStyle> builder)
    {
    }
}
