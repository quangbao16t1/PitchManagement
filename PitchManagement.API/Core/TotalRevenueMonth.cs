using PitchManagement.API.Dtos.OrderPitches;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Core
{
    public class TotalRevenueMonth
    {
        public int Total { get; set; }
        public IEnumerable<RevenueUI> Revenues { get; set; }
    }
}
