using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class AddQuizRuns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuizRunId",
                table: "Subscriptions",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "QuizRuns",
                columns: table => new
                {
                    QuizRunId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizRuns", x => x.QuizRunId);
                    table.ForeignKey(
                        name: "FK_QuizRuns_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizRunSteps",
                columns: table => new
                {
                    QuizRunStepId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizRunId = table.Column<int>(nullable: true),
                    RoundId = table.Column<int>(nullable: true),
                    QuestionId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizRunSteps", x => x.QuizRunStepId);
                    table.ForeignKey(
                        name: "FK_QuizRunSteps_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuizRunSteps_QuizRuns_QuizRunId",
                        column: x => x.QuizRunId,
                        principalTable: "QuizRuns",
                        principalColumn: "QuizRunId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuizRunSteps_Rounds_RoundId",
                        column: x => x.RoundId,
                        principalTable: "Rounds",
                        principalColumn: "RoundId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_QuizRunId",
                table: "Subscriptions",
                column: "QuizRunId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRuns_QuizId",
                table: "QuizRuns",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunSteps_QuestionId",
                table: "QuizRunSteps",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunSteps_QuizRunId",
                table: "QuizRunSteps",
                column: "QuizRunId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunSteps_RoundId",
                table: "QuizRunSteps",
                column: "RoundId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_QuizRuns_QuizRunId",
                table: "Subscriptions",
                column: "QuizRunId",
                principalTable: "QuizRuns",
                principalColumn: "QuizRunId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_QuizRuns_QuizRunId",
                table: "Subscriptions");

            migrationBuilder.DropTable(
                name: "QuizRunSteps");

            migrationBuilder.DropTable(
                name: "QuizRuns");

            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_QuizRunId",
                table: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "QuizRunId",
                table: "Subscriptions");
        }
    }
}
