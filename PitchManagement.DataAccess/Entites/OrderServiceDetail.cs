using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class OrderServiceDetail
    {
        public int Id { get; set; }
        [Required]
        public int ServiceDetailId { get; set; }
        [ForeignKey("ServiceDetailId")]
        public int OrderPitchId { get; set; }
        [ForeignKey("OrderPitchId")]
        public virtual ServiceDetail ServiceDetail { get; set; }
        public virtual OrderPitch OrderPitch { get; set; }
    }
}
