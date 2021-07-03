using PitchManagement.API.Dtos.OrderPitches;
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
        IEnumerable<OrderPitch> GeOrderPitchByPitchId(int pitchId, int status);
        IEnumerable<OrderPitch> HistoryOrderPitcher(int pitchId);
        IEnumerable<OrderPitch> GeOrderPitchByUserId(int userId);
        IEnumerable<OrderPitch> GetOrderPitchByDate(DateTime dateOrder, int userId);
        IEnumerable<OrderPitch> GetOrderByDatePitchId(DateTime dateOrder, int pitchId);
        Task<OrderPitch> GetOrderPitchByIdAsync(int id);
        Task<bool> CreateOrderPitchAsync(OrderPitch orderPitchCreate);
        Task<bool> UpdateOrderPitchAsync(int id, OrderPitch orderPitchUpdate);
        Task<bool> CancelOrderPitchAsync(int id, OrderPitch orderPitchUpdate);
        Task<bool> DeleteOrderPitchAsync(int id);
        IEnumerable<RevenueUI> GetRevenueMonth(int pitchId, DateTime date);
    }
}
