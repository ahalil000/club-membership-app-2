using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MembershipWebApp.Domain.Migrations
{
    public partial class Add_MemberDetail_Fields_17_11_2018 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsMemberFeePaid",
                table: "MemberDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RenewalReminderDate",
                table: "MemberDetails",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMemberFeePaid",
                table: "MemberDetails");

            migrationBuilder.DropColumn(
                name: "RenewalReminderDate",
                table: "MemberDetails");
        }
    }
}
