using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CoNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class StylesAndComponentGroupsRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Components_ComponentGroups_ComponentGroupId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Styles_StyleId",
                table: "Components");

            migrationBuilder.DropTable(
                name: "ComponentGroups");

            migrationBuilder.DropTable(
                name: "WorksheetStyles");

            migrationBuilder.DropTable(
                name: "Styles");

            migrationBuilder.DropIndex(
                name: "IX_Components_ComponentGroupId",
                table: "Components");

            migrationBuilder.DropIndex(
                name: "IX_Components_StyleId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ComponentGroupId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "StyleId",
                table: "Components");

            migrationBuilder.RenameColumn(
                name: "ContentJson",
                table: "Components",
                newName: "Style");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Components",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rotation",
                table: "Components",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "Rotation",
                table: "Components");

            migrationBuilder.RenameColumn(
                name: "Style",
                table: "Components",
                newName: "ContentJson");

            migrationBuilder.AddColumn<long>(
                name: "ComponentGroupId",
                table: "Components",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "Components",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "StyleId",
                table: "Components",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ComponentGroups",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorksheetId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedBy = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComponentGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComponentGroups_Worksheets_WorksheetId",
                        column: x => x.WorksheetId,
                        principalTable: "Worksheets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Styles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComponentType = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedBy = table.Column<string>(type: "text", nullable: false),
                    StyleJson = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Styles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorksheetStyles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StyleId = table.Column<long>(type: "bigint", nullable: false),
                    WorksheetId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedBy = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorksheetStyles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorksheetStyles_Styles_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Styles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorksheetStyles_Worksheets_WorksheetId",
                        column: x => x.WorksheetId,
                        principalTable: "Worksheets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Components_ComponentGroupId",
                table: "Components",
                column: "ComponentGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Components_StyleId",
                table: "Components",
                column: "StyleId");

            migrationBuilder.CreateIndex(
                name: "IX_ComponentGroups_WorksheetId",
                table: "ComponentGroups",
                column: "WorksheetId");

            migrationBuilder.CreateIndex(
                name: "IX_WorksheetStyles_StyleId",
                table: "WorksheetStyles",
                column: "StyleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorksheetStyles_WorksheetId",
                table: "WorksheetStyles",
                column: "WorksheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_ComponentGroups_ComponentGroupId",
                table: "Components",
                column: "ComponentGroupId",
                principalTable: "ComponentGroups",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Styles_StyleId",
                table: "Components",
                column: "StyleId",
                principalTable: "Styles",
                principalColumn: "Id");
        }
    }
}
