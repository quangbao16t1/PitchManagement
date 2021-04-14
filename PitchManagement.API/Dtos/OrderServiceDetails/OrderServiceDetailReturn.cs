using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.OrderServiceDetails
{
    public class OrderServiceDetailReturn
    {
        public int Id { get; set; }
        [Required]
        public string SubPitchName { get; set; }
        public string UserName { get; set; }
        public string ServiceName { get; set; }
        public double ServiceCost { get; set; }
        public double OrderCost { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string PhoneOrder { get; set; }

    }
}
