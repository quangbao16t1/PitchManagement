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
        public string Area { get; set; }
        public string CreateBy { get; set; }
        public int Level { get; set; }
        public string Logo { get; set; }
        public string Description { get; set; }
        public string TeamImage { get; set; }
        public string ImageUrl { get; set; }
        //public int PitchId { get; set; }
        //[ForeignKey("PitchId")]
        //public virtual Pitch Pitch { get; set; }
        public int PitchSubId { get; set; }
        [ForeignKey("SubPitchId")]
        public virtual SubPitch SubPitch { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public int DateOfWeek { get; set; }
        public string StartTime { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime DeleteTime { get; set; }
        public virtual ICollection<TeamUser>  TeamUsers { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        
        



    }
}
