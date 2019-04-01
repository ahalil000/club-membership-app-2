using Microsoft.EntityFrameworkCore.Migrations;

namespace MembershipWebApp.Domain.Migrations
{
    public partial class Apply_Identity_Tables_15_12_2018_Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_UserRoles_Id",
                table: "UserRoles");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRoles");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserRoles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_UserRoles_Id",
                table: "UserRoles",
                column: "Id");
        }
    }
}
