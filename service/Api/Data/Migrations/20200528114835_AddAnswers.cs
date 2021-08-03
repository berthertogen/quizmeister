using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class AddAnswers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuizRunStepAnswers",
                columns: table => new
                {
                    QuizRunStepAnswerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubscriptionId = table.Column<int>(nullable: false),
                    QuizRunStepId = table.Column<int>(nullable: false),
                    Answers = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizRunStepAnswers", x => x.QuizRunStepAnswerId);
                    table.ForeignKey(
                        name: "FK_QuizRunStepAnswers_QuizRunSteps_QuizRunStepId",
                        column: x => x.QuizRunStepId,
                        principalTable: "QuizRunSteps",
                        principalColumn: "QuizRunStepId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizRunStepAnswers_Subscriptions_SubscriptionId",
                        column: x => x.SubscriptionId,
                        principalTable: "Subscriptions",
                        principalColumn: "SubscriptionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunStepAnswers_QuizRunStepId",
                table: "QuizRunStepAnswers",
                column: "QuizRunStepId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizRunStepAnswers_SubscriptionId",
                table: "QuizRunStepAnswers",
                column: "SubscriptionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuizRunStepAnswers");
        }
    }
}
