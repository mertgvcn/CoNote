using CoNote.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.Followings)
            .WithMany(u => u.Followers)
            .UsingEntity(j => j.ToTable("UserFollowings"));

        builder.HasMany(u => u.BlockedUsers)
            .WithMany(u => u.BlockedByUsers)
            .UsingEntity(j => j.ToTable("UserBlocks"));
    }
}
