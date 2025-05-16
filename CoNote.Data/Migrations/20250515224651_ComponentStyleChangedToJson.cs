using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class ComponentStyleChangedToJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Style",
                table: "Components",
                type: "jsonb USING \"Style\"::jsonb",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Style",
                table: "Components",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "jsonb",
                oldNullable: true);
        }
    }
}
