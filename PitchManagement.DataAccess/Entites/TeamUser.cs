using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class TeamUser
    {
        public int Id { get; set; }
        [Required]
        public int TeamId { get; set; }
        [ForeignKey("TeamId")]
        [Required]
        public virtual Team Team { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime DeleteTime { get; set; }
        
        
    }
}
