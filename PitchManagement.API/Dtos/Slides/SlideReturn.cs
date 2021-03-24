using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Slides
{
    public class SlideReturn
    {
        public int Id { get; set; }
        [Required]
        public string PitchName { get; set; }
        public string ImageUrl { get; set; }
        public int Status { get; set; }
    }
}
