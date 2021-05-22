using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.OrderPitches
{
    public class OrderPitchReturn
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PitchName { get; set; }
        public int Status { get; set; }
        public string SubPitchName { get; set; }
        public double Cost { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Note { get; set; }
        public bool IsDelete { get; set; }
        public string PhoneOrder { get; set; }
        public DateTime? DateOrder { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}
