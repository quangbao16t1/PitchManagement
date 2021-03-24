using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Slides
{
    public class SlideUI
    {
        public int Id { get; set; }
        [Required]
        public int PitchId { get; set; }
        public string ImageUrl { get; set; }
        public int Status { get; set; }
    }
}
