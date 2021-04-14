using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IOrderPitchRepository
    {
        IEnumerable<OrderPitch> GetAllOrderPitch(string keyword);
        Task<OrderPitch> GetOrderPitchByIdAsync(int id);
        Task<bool> CreateOrderPitchAsync(OrderPitch orderPitchCreate);
        Task<bool> UpdateOrderPitchAsync(int id, OrderPitch orderPitchUpdate);
        Task<bool> DeleteOrderPitchAsync(int id);
    }
}
