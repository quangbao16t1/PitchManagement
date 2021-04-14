using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
     public interface IOrderServiceDetailRepository
    {
        IEnumerable<OrderServiceDetail> GetAllOrderServiceDetails();
        Task<OrderServiceDetail> GetOrderServiceDetailByIdAsnyc(int id);
        Task<bool> CreateOrderServiceDetailAsync(OrderServiceDetail orderServiceCreate);
        Task<bool> UpdateOrderServiceDetailAsync(int id, OrderServiceDetail orderServiceUpdate);
        Task<bool> DeleteOrderServiceDetailAsync(int id);
    }
}
