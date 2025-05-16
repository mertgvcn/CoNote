using CoNote.Core.Entities;
using CoNote.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class ComponentConfiguration : IEntityTypeConfiguration<Component>
{
    public void Configure(EntityTypeBuilder<Component> builder)
    {
        builder
            .Property(e => e.Style)
            .HasColumnType("jsonb")
            .HasConversion(
                v => v != null ? System.Text.Json.JsonSerializer.Serialize(v, new System.Text.Json.JsonSerializerOptions { PropertyNamingPolicy = null }) : null,
                v => v != null ? System.Text.Json.JsonSerializer.Deserialize<StyleProperties>(v, new System.Text.Json.JsonSerializerOptions { PropertyNamingPolicy = null }) : null
            );
    }
}
