using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Matches
{
    public class MatchUI
    {
        public int Id { get; set; }
        [Required]
        public DateTime SetupTime { get; set; }
        public int TeamId { get; set; }
        public int Type { get; set; }//type ( 0 - đã có sân, 1 - đi khách
        public int PitchId { get; set; }
        public string Covenant { get; set; }
        public string Level { get; set; } // 'level ( 0 - Mới chơi, 1 - TB, 2 - TB khá, 3 - Phủi, 4 - TB yếu, 5 - Mềm, 6 - Rất mềm, 7 Khá; 8 - Khá mạnh, 9 - Mạnh',
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
