using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class RenameAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Questions_QuestionId",
                table: "Answer");

            migrationBuilder.DropForeignKey(
                name: "FK_RoundQuestion_Questions_QuestionId",
                table: "RoundQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_RoundQuestion_Rounds_RoundId",
                table: "RoundQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_Scoring_Questions_QuestionId",
                table: "Scoring");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Scoring",
                table: "Scoring");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoundQuestion",
                table: "RoundQuestion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answer",
                table: "Answer");

            migrationBuilder.RenameTable(
                name: "Scoring",
                newName: "Scorings");

            migrationBuilder.RenameTable(
                name: "RoundQuestion",
                newName: "RoundsQuestions");

            migrationBuilder.RenameTable(
                name: "Answer",
                newName: "Answers");

            migrationBuilder.RenameIndex(
                name: "IX_Scoring_QuestionId",
                table: "Scorings",
                newName: "IX_Scorings_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_RoundQuestion_QuestionId",
                table: "RoundsQuestions",
                newName: "IX_RoundsQuestions_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Answer_QuestionId",
                table: "Answers",
                newName: "IX_Answers_QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Scorings",
                table: "Scorings",
                column: "ScoringId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoundsQuestions",
                table: "RoundsQuestions",
                columns: new[] { "RoundId", "QuestionId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answers",
                table: "Answers",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoundsQuestions_Questions_QuestionId",
                table: "RoundsQuestions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoundsQuestions_Rounds_RoundId",
                table: "RoundsQuestions",
                column: "RoundId",
                principalTable: "Rounds",
                principalColumn: "RoundId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Scorings_Questions_QuestionId",
                table: "Scorings",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questions_QuestionId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_RoundsQuestions_Questions_QuestionId",
                table: "RoundsQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_RoundsQuestions_Rounds_RoundId",
                table: "RoundsQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_Scorings_Questions_QuestionId",
                table: "Scorings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Scorings",
                table: "Scorings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoundsQuestions",
                table: "RoundsQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answers",
                table: "Answers");

            migrationBuilder.RenameTable(
                name: "Scorings",
                newName: "Scoring");

            migrationBuilder.RenameTable(
                name: "RoundsQuestions",
                newName: "RoundQuestion");

            migrationBuilder.RenameTable(
                name: "Answers",
                newName: "Answer");

            migrationBuilder.RenameIndex(
                name: "IX_Scorings_QuestionId",
                table: "Scoring",
                newName: "IX_Scoring_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_RoundsQuestions_QuestionId",
                table: "RoundQuestion",
                newName: "IX_RoundQuestion_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Answers_QuestionId",
                table: "Answer",
                newName: "IX_Answer_QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Scoring",
                table: "Scoring",
                column: "ScoringId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoundQuestion",
                table: "RoundQuestion",
                columns: new[] { "RoundId", "QuestionId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answer",
                table: "Answer",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Questions_QuestionId",
                table: "Answer",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoundQuestion_Questions_QuestionId",
                table: "RoundQuestion",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoundQuestion_Rounds_RoundId",
                table: "RoundQuestion",
                column: "RoundId",
                principalTable: "Rounds",
                principalColumn: "RoundId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Scoring_Questions_QuestionId",
                table: "Scoring",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
