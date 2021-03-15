using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.SubPitches
{
    public class SubPitchReturn
    {
        public int Id { get; set; }
        [Required]
        public string PitchName { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }//5-7-9-11
        public int Status { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
