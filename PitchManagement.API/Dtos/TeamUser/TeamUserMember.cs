using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.TeamUser
{
    public class TeamUserMember
    {
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
    }
}
