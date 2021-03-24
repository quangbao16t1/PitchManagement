using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class OrderPitch
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int Status { get; set; }
        public int SubPitchDetailId { get; set; }
        [ForeignKey("SubPitchDetailId")]
        public virtual SubPitchDetail SubPitchDetail { get; set; }
        //public int ServiceDetailId { get; set; }
        //[ForeignKey("ServiceDetailId")]
        //public virtual ServiceDetail ServiceDetail { get; set; }
        public string Note { get; set; }
        public bool IsDelete { get; set; }
        public string UserOrder { get; set; }
        public string PhoneOrder { get; set; }
        public DateTime? DateOrder { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }

    }
}
