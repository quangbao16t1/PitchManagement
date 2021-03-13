using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class SubPitchNumber
    {
        public int Id { get; set; }
        [Required]
        public int SubPitchId { get; set; }
        [ForeignKey("SubPitchId")]
        public virtual SubPitch SubPitch { get; set; }
        //public virtual ICollection<TimeSlot> TimeSlots { get; set; }
    }
}
