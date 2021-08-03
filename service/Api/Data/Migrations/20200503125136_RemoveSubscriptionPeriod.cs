using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class RemoveSubscriptionPeriod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubscriptionStart",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "SubscriptionStop",
                table: "Quizzes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SubscriptionStart",
                table: "Quizzes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SubscriptionStop",
                table: "Quizzes",
                type: "datetime2",
                nullable: true);
        }
    }
}
