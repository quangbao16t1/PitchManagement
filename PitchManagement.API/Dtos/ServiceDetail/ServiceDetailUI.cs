using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.ServiceDetail
{
    public class ServiceDetailUI
    {
        public int Id { get; set; }
        [Required]
        public int SubPitchId { get; set; }
        public int ServiceId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public double Cost { get; set; }
    }
}
