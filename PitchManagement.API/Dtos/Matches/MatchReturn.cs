using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Matches
{
    public class MatchReturn
    {
        public int Id { get; set; }
        [Required]
        public DateTime SetupTime { get; set; }
        public string TeamName { get; set; }
        public int Type { get; set; }
        public string PitchName { get; set; }
        public string Covenant { get; set; }
        public string Level { get; set; } 
        public string invitation { get; set; }
        public int InviteeId { get; set; }
        public int ReceiverId { get; set; }
        public int Status { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Area { get; set; }
        public string Note { get; set; }
    }
}
