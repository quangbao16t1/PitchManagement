using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Service
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        
        public virtual ICollection<ServiceDetail> ServiceDetails { get; set; }
    }
}
