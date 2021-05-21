using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.OrderPitches
{
    public class OrderPitchUI
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public int Status { get; set; }
        public int? SubPitchDetailId { get; set; }
        public string Note { get; set; }
        public bool IsDelete { get; set; }
        public string PhoneOrder { get; set; }

        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public string DateOrder { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
