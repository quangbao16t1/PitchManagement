using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.SubPitchDetail
{
    public class SubPitchDetailUI
    {
        public int Id { get; set; }
        [Required]
        public int SubPitchId { get; set; }
        public double Cost { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
