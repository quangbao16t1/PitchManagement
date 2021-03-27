using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class TimeSlot
    {
        public int Id { get; set; }
        [Required]
        public int SubPitchNumberId { get; set; }
        [ForeignKey("SubPitchNumberId")]
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
