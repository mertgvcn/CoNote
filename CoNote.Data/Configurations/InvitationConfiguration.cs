using CoNote.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoNote.Data.Configurations;
public class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
{
    public void Configure(EntityTypeBuilder<Invitation> builder)
    {
        builder.Property(i => i.Status)
            .HasConversion<string>();

        builder.HasOne(i => i.Workspace)
            .WithMany(w => w.Invitations)
            .HasForeignKey(i => i.WorkspaceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.Sender)
           .WithMany(u => u.SentInvitations)
           .HasForeignKey(i => i.SenderId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.Receiver)
            .WithMany(u => u.ReceivedInvitations)
            .HasForeignKey(i => i.ReceiverId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.Role)
            .WithMany()
            .HasForeignKey(i => i.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
