using Microsoft.EntityFrameworkCore.Migrations;

namespace PitchManagement.DataAccess.Migrations
{
    public partial class addFKMatch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Pitches_PitchId",
                table: "Matches");

            migrationBuilder.AlterColumn<int>(
                name: "PitchId",
                table: "Matches",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Pitches_PitchId",
                table: "Matches",
                column: "PitchId",
                principalTable: "Pitches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Pitches_PitchId",
                table: "Matches");

            migrationBuilder.AlterColumn<int>(
                name: "PitchId",
                table: "Matches",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Pitches_PitchId",
                table: "Matches",
                column: "PitchId",
                principalTable: "Pitches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
