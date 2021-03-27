using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Team
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int CreateBy { get; set; }
        public string Level { get; set; }
        public string Logo { get; set; }
        public string Description { get; set; }
        public string TeamImage { get; set; }
        public string ImageUrl { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public string DateOfWeek { get; set; }
        public string StartTime { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public virtual ICollection<TeamUser>  TeamUsers { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        
        



    }
}
