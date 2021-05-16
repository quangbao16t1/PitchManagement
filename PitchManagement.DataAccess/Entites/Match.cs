using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class Match
    {
        public int Id { get; set; }
        [Required]
        public DateTime SetupTime { get; set; }
        public int? TeamId { get; set; }
        [ForeignKey("TeamId")]
        public virtual Team Team { get; set; }
        public int Type { get; set; }//type ( 0 - đã có sân, 1 - đi khách)   
        public int? PitchId { get; set; }
        [ForeignKey("PitchId")]
        public virtual Pitch Pitch { get; set; }
        public string Covenant { get; set; }
        public string Level { get; set; }
        public string invitation { get; set; }
        public int InviteeId { get; set; }
        public int ReceiverId { get; set; }
        public int Status { get; set; } // '0 - Waiting;  1 - confirmed, 2 - canceled ,  3 - Waiting confirmed
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Area { get; set; }
        public string Note { get; set; }
       
    }

}
