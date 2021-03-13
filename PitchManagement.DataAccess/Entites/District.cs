using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class District
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Type { get; set; }
        public int ProvinceId { get; set; }
        [ForeignKey("ProvinceId")]
        public virtual Province Province { get; set; }
        public virtual ICollection<Ward> Wards { get; set; }
        public virtual ICollection<Pitch> Pitches { get; set; }
        
    }
}
