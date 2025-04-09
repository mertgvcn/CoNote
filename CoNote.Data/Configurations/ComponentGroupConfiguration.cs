using CoNote.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class ComponentGroupConfiguration : IEntityTypeConfiguration<ComponentGroup>
{
    public void Configure(EntityTypeBuilder<ComponentGroup> builder)
    {
    }
}
