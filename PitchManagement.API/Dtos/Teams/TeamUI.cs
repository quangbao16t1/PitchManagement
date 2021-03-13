using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Teams
{
    public class TeamUI
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Area { get; set; }
        public string CreateBy { get; set; }
        public int Level { get; set; }
        public string Logo { get; set; }
        public string Description { get; set; }
        public string TeamImage { get; set; }
        public string ImageUrl { get; set; }
        public int PitchSubId { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        public int DateOfWeek { get; set; }
        public string StartTime { get; set; }
    }
}
