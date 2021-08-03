using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class ReworkRunStep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizRunSteps_QuizRuns_QuizRunId",
                table: "QuizRunSteps");

            migrationBuilder.DropForeignKey(
                name: "FK_Subscriptions_QuizRuns_QuizRunId",
                table: "Subscriptions");

            migrationBuilder.DropTable(
                name: "QuizRuns");

            migrationBuilder.DropIndex(
                name: "IX_Subscriptions_QuizRunId",
                table: "Subscriptions");

            migrationBuilder.DropIndex(
                name: "IX_QuizRunSteps_QuizRunId",
                table: "QuizRunSteps");

            migrationBuilder.DropColumn(
                name: "QuizRunId",
                table: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "QuizRunId",
                table: "QuizRunSteps");

            migrationBuilder.AddColumn<int>(
                name: "QuizId",
                table: "QuizRunSteps",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "QuizRunSteps",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunSteps_QuizId",
                table: "QuizRunSteps",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizRunSteps_Quizzes_QuizId",
                table: "QuizRunSteps",
                column: "QuizId",
                principalTable: "Quizzes",
                principalColumn: "QuizId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizRunSteps_Quizzes_QuizId",
                table: "QuizRunSteps");

            migrationBuilder.DropIndex(
                name: "IX_QuizRunSteps_QuizId",
                table: "QuizRunSteps");

            migrationBuilder.DropColumn(
                name: "QuizId",
                table: "QuizRunSteps");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "QuizRunSteps");

            migrationBuilder.AddColumn<int>(
                name: "QuizRunId",
                table: "Subscriptions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuizRunId",
                table: "QuizRunSteps",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "QuizRuns",
                columns: table => new
                {
                    QuizRunId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizId = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_QuizRunId",
                table: "Subscriptions",
                column: "QuizRunId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunSteps_QuizRunId",
                table: "QuizRunSteps",
                column: "QuizRunId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRuns_QuizId",
                table: "QuizRuns",
                column: "QuizId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizRunSteps_QuizRuns_QuizRunId",
                table: "QuizRunSteps",
                column: "QuizRunId",
                principalTable: "QuizRuns",
                principalColumn: "QuizRunId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Subscriptions_QuizRuns_QuizRunId",
                table: "Subscriptions",
                column: "QuizRunId",
                principalTable: "QuizRuns",
                principalColumn: "QuizRunId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
