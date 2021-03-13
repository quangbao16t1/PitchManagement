using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Province
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Type { get; set; }
        public virtual ICollection<District> Districts { get; set; }
        //public virtual ICollection<Match> Matches { get; set; }
    }
}
