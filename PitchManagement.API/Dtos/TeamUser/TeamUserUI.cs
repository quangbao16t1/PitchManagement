using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.TeamUser
{
    public class TeamUserUI
    {
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
