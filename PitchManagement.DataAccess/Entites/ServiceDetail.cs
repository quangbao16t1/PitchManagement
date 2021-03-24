using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class ServiceDetail
    {
        public int Id { get; set; }
        [Required]
        public int SubPitchId { get; set; }
        [ForeignKey("SubPitchId")]
        public virtual SubPitch SubPitch { get; set; }
        public int ServiceId { get; set; }
        [ForeignKey("ServiceId")]
        public virtual Service Service { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public double Cost { get; set; }
        public virtual ICollection<OrderPitch> OrderPitches { get; set; }
    }
}
