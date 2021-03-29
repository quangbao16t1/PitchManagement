using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.ServiceDetail
{
    public class ServiceDetailReturn
    {
        public int Id { get; set; }
        [Required]
        public string SubPitchName { get; set; }
        public string ServiceName { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public double Cost { get; set; }
    }
}
