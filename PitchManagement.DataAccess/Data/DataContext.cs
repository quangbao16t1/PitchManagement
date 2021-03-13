using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PitchManagement.DataAccess.Entites;
using System;
using System.IO;

namespace PitchManagement.DataAccess
{
    public class DataContext:DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions options): base(options)
        {

        }
        public DbSet<District> Districts { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<OrderPitch> OrderPitches  { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<PermissionDetail> PermissionDetails  { get; set; }
        public DbSet<Pitch> Pitches { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Slide> Slides { get; set; }
        public DbSet<SubPitch> SubPitches  { get; set; }
        public DbSet<SubPitchDetail> SubPitchDetails { get; set; }
        public DbSet<SubPitchNumber> SubPitchNumbers { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamUser> TeamUsers { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPermission> UserPermissions  { get; set; }
        public DbSet<Ward> Wards { get; set; }

    }
}
