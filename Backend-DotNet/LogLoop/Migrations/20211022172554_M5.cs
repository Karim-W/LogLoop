using Microsoft.EntityFrameworkCore.Migrations;

namespace LogLoop.Migrations
{
    public partial class M5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_User_UserId",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Post",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Post_UserId",
                table: "Post",
                newName: "IX_Post_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_User_AuthorId",
                table: "Post",
                column: "AuthorId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_User_AuthorId",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Post",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Post_AuthorId",
                table: "Post",
                newName: "IX_Post_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_User_UserId",
                table: "Post",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
