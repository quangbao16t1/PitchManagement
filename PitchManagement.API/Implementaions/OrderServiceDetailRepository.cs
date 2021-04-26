using Microsoft.EntityFrameworkCore;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Implementaions
{
    public class OrderServiceDetailRepository : IOrderServiceDetailRepository
    {
        private readonly DataContext _context;

        public OrderServiceDetailRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateOrderServiceDetailAsync(OrderServiceDetail orderServiceCreate)
        {
            try
            {
                _context.OrderServiceDetails.Add(orderServiceCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteOrderServiceDetailAsync(int id)
        {
            var orderServiceInDb = await _context.OrderServiceDetails.FirstOrDefaultAsync(x => x.Id == id);
            if (orderServiceInDb == null)
                return false;
            try
            {
                _context.Remove(orderServiceInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<OrderServiceDetail> GetAllOrderServiceDetails()
        {
           // return _context.OrderServiceDetails.Include(x => x.OrderPitch).Include(y => y.ServiceDetail).AsEnumerable();

            return _context.OrderServiceDetails.Include(x => x.OrderPitch).ThenInclude(x => x.User)
                                    .Include(x => x.ServiceDetail).ThenInclude(x => x.SubPitch)
                                    .Include(x => x.OrderPitch).ThenInclude(x => x.SubPitchDetail)
                                   .Include(x => x.ServiceDetail).ThenInclude(x => x.Service).AsEnumerable();
        }

        public async Task<OrderServiceDetail> GetOrderServiceDetailByIdAsnyc(int id)
        {
            return await _context.OrderServiceDetails.Include(x => x.OrderPitch).Include(y => y.ServiceDetail).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateOrderServiceDetailAsync(int id, OrderServiceDetail orderServiceUpdate)
        {
            var orderServiceInDb = await _context.OrderServiceDetails.FirstOrDefaultAsync(x => x.Id == id);
            if (orderServiceInDb == null)
                return false;
            try
            {
                orderServiceInDb.OrderPitchId = orderServiceUpdate.OrderPitchId;
                orderServiceInDb.ServiceDetailId = orderServiceUpdate.ServiceDetailId;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
