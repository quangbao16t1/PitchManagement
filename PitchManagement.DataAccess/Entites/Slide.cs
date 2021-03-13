using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Slide
    {
        public int Id { get; set; }
        [Required]
        public int PitchId { get; set; }
        [ForeignKey("PitchId")]
        public string ImageUrl { get; set; }
        public int Status { get; set; }
        public virtual Pitch Pitch { get; set; }
    }
}
