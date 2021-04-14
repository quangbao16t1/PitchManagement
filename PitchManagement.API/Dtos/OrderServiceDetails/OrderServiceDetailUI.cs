using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.OrderServiceDetails
{
    public class OrderServiceDetailUI
    {
        public int Id { get; set; }
        [Required]
        public int ServiceDetailId { get; set; }
        public int OrderPitchId { get; set; }

    }
}
