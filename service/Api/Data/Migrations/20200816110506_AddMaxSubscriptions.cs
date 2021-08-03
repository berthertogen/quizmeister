using Microsoft.EntityFrameworkCore.Migrations;

namespace QuizmeisterApi.Data.Migrations
{
    public partial class AddMaxSubscriptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxSubscriptions",
                table: "Quizzes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxSubscriptions",
                table: "Quizzes");
        }
    }
}
