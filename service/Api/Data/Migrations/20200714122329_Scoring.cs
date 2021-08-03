using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class Scoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Correct",
                table: "QuizRunStepAnswers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "QuizRunStepAnswers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SendOn",
                table: "QuizRunStepAnswers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Correct",
                table: "QuizRunStepAnswers");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "QuizRunStepAnswers");

            migrationBuilder.DropColumn(
                name: "SendOn",
                table: "QuizRunStepAnswers");
        }
    }
}
