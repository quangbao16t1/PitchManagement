using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PitchManagement.DataAccess.Migrations
{
    public partial class UpdateDatabaseService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPitches_SubPitchDetails_SubPitchDetailId",
                table: "OrderPitches");

            migrationBuilder.DropColumn(
                name: "UserOrder",
                table: "OrderPitches");

            migrationBuilder.AlterColumn<int>(
                name: "SubPitchDetailId",
                table: "OrderPitches",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubPitchId = table.Column<int>(type: "int", nullable: false),
                    ServiceId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    Cost = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceDetails_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceDetails_SubPitches_SubPitchId",
                        column: x => x.SubPitchId,
                        principalTable: "SubPitches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderServiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceDetailId = table.Column<int>(type: "int", nullable: false),
                    OrderPitchId = table.Column<int>(type: "int", nullable: false),
                    OrderPitchId1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderServiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderServiceDetails_OrderPitches_OrderPitchId1",
                        column: x => x.OrderPitchId1,
                        principalTable: "OrderPitches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderServiceDetails_ServiceDetails_OrderPitchId",
                        column: x => x.OrderPitchId,
                        principalTable: "ServiceDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderServiceDetails_OrderPitchId",
                table: "OrderServiceDetails",
                column: "OrderPitchId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderServiceDetails_OrderPitchId1",
                table: "OrderServiceDetails",
                column: "OrderPitchId1");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetails_ServiceId",
                table: "ServiceDetails",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDetails_SubPitchId",
                table: "ServiceDetails",
                column: "SubPitchId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPitches_SubPitchDetails_SubPitchDetailId",
                table: "OrderPitches",
                column: "SubPitchDetailId",
                principalTable: "SubPitchDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPitches_SubPitchDetails_SubPitchDetailId",
                table: "OrderPitches");

            migrationBuilder.DropTable(
                name: "OrderServiceDetails");

            migrationBuilder.DropTable(
                name: "ServiceDetails");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.AlterColumn<int>(
                name: "SubPitchDetailId",
                table: "OrderPitches",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserOrder",
                table: "OrderPitches",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPitches_SubPitchDetails_SubPitchDetailId",
                table: "OrderPitches",
                column: "SubPitchDetailId",
                principalTable: "SubPitchDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
