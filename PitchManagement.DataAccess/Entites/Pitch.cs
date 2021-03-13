using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Pitch
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Decription { get; set; }
        public string Type { get; set; }
        public int DistrictId { get; set; }
        [ForeignKey("DistrictId")]
        public virtual District District { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string WebSite { get; set; }
        public string Avatar { get; set; }
        public DateTime DateOrder { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime DeleteTime { get; set; }
        public string CreateBy { get; set; }
        public int Status { get; set; }
        public virtual ICollection<SubPitch> SubPitches { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        //public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<Slide> Slides { get; set; }
        
    }
}
