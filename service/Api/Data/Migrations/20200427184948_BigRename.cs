using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class BigRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizRound_Quizzes_QuizId",
                table: "QuizRound");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizRound_Rounds_RoundId",
                table: "QuizRound");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuizRound",
                table: "QuizRound");

            migrationBuilder.RenameTable(
                name: "QuizRound",
                newName: "QuizzesRounds");

            migrationBuilder.RenameIndex(
                name: "IX_QuizRound_RoundId",
                table: "QuizzesRounds",
                newName: "IX_QuizzesRounds_RoundId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuizzesRounds",
                table: "QuizzesRounds",
                columns: new[] { "QuizId", "RoundId" });

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzesRounds_Quizzes_QuizId",
                table: "QuizzesRounds",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzesRounds_Rounds_RoundId",
                table: "QuizzesRounds",
                column: "RoundId",
                principalTable: "Rounds",
                principalColumn: "RoundId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizzesRounds_Quizzes_QuizId",
                table: "QuizzesRounds");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizzesRounds_Rounds_RoundId",
                table: "QuizzesRounds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuizzesRounds",
                table: "QuizzesRounds");

            migrationBuilder.RenameTable(
                name: "QuizzesRounds",
                newName: "QuizRound");

            migrationBuilder.RenameIndex(
                name: "IX_QuizzesRounds_RoundId",
                table: "QuizRound",
                newName: "IX_QuizRound_RoundId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuizRound",
                table: "QuizRound",
                columns: new[] { "QuizId", "RoundId" });

            migrationBuilder.AddForeignKey(
                name: "FK_QuizRound_Quizzes_QuizId",
                table: "QuizRound",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizRound_Rounds_RoundId",
                table: "QuizRound",
                column: "RoundId",
                principalTable: "Rounds",
                principalColumn: "RoundId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
