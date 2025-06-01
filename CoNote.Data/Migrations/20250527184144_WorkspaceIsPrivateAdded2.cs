using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class WorkspaceIsPrivateAdded2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isPrivate",
                table: "Workspaces",
                newName: "IsPrivate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPrivate",
                table: "Workspaces",
                newName: "isPrivate");
        }
    }
}
