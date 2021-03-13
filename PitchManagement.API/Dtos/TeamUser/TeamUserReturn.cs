using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.TeamUser
{
    public class TeamUserReturn
    {
        public int Id { get; set; }
        public int NameTeam { get; set; }
        public int NameUser { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime DeleteTime { get; set; }
    }
}
