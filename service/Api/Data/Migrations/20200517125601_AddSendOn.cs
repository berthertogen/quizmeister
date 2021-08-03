using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class AddSendOn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SendOn",
                table: "QuizRunSteps",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SendOn",
                table: "QuizRunSteps");
        }
    }
}
