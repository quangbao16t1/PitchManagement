using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class SubPitch
    {
        public int Id { get; set; }
        [Required]
        public int PitchId { get; set; }
        [ForeignKey("PitchId")]
        public virtual Pitch Pitch { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }//5-7-9-11
        public int Status { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public virtual ICollection<SubPitchNumber> SubPitchNumbers { get; set; }
        public virtual ICollection<SubPitchDetail> SubPitchDetails { get; set; }
        //public virtual ICollection<ServiceDetail> ServiceDetails { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
    }
}
