using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.TeamUser
{
    public class AllTeamUser
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public string TeamId { get; set; }
        public UserDto UserCreate { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }
        public string Logo { get; set; }
        public string ImageUrl { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public string DateOfWeek { get; set; }
        public string StartTime { get; set; }
    }
}
