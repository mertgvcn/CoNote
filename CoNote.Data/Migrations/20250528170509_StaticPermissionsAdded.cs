using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CoNote.Data.Migrations
{
    /// <inheritdoc />
    public partial class StaticPermissionsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "Action", "CreatedAt", "CreatedBy", "EditedAt", "EditedBy", "ObjectType" },
                values: new object[,]
                {
                    { 1L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9174), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9175), "System", 0 },
                    { 2L, 0, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9178), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9179), "System", 1 },
                    { 3L, 1, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9181), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9181), "System", 1 },
                    { 4L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9183), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9184), "System", 1 },
                    { 5L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9186), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9186), "System", 1 },
                    { 6L, 0, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9190), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9190), "System", 2 },
                    { 7L, 1, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9192), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9192), "System", 2 },
                    { 8L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9194), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9195), "System", 2 },
                    { 9L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9197), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9197), "System", 2 },
                    { 10L, 0, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9200), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9200), "System", 3 },
                    { 11L, 1, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9202), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9202), "System", 3 },
                    { 12L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9204), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9205), "System", 3 },
                    { 13L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9206), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9207), "System", 3 },
                    { 14L, 0, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9209), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9209), "System", 4 },
                    { 15L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9211), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9212), "System", 4 },
                    { 16L, 0, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9214), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9214), "System", 5 },
                    { 17L, 1, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9216), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9216), "System", 5 },
                    { 18L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9219), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9219), "System", 5 },
                    { 19L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9221), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9222), "System", 5 },
                    { 20L, 1, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9224), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9224), "System", 6 },
                    { 21L, 2, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9226), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9226), "System", 6 },
                    { 22L, 3, new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9228), "System", new DateTime(2025, 5, 28, 20, 5, 8, 203, DateTimeKind.Local).AddTicks(9229), "System", 6 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 11L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 12L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 13L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 14L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 15L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 16L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 17L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 18L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 19L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 20L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 21L);

            migrationBuilder.DeleteData(
                table: "Permissions",
                keyColumn: "Id",
                keyValue: 22L);
        }
    }
}
