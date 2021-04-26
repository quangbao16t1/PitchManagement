using AutoMapper;
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
    public class OrderPitchRepository : IOrderPitchRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrderPitchRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateOrderPitchAsync(OrderPitch orderPitchCreate)
        {
            try
            {
                _context.OrderPitches.Add(orderPitchCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteOrderPitchAsync(int id)
        {
            var orderInDb = await _context.Districts.FirstOrDefaultAsync(x => x.Id == id);

            if (orderInDb == null)
            {
                return false;
            }

            try
            {
                _context.Districts.Remove(orderInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<OrderPitch> GetAllOrderPitch(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.OrderPitches
                 .Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .Include(x => x.User).Include(x => x.SubPitchDetail).AsEnumerable();
        }

        public async Task<OrderPitch> GetOrderPitchByIdAsync(int id)
        {
            return await _context.OrderPitches.Include(x => x.User).Include(x => x.SubPitchDetail).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateOrderPitchAsync(int id, OrderPitch orderPitchUpdate)
        {
            var order = await _context.OrderPitches.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return false;

            try
            {
                order.UserId = orderPitchUpdate.UserId;
                order.Status = orderPitchUpdate.Status;
                order.SubPitchDetailId = orderPitchUpdate.SubPitchDetailId;
                order.DateOrder = orderPitchUpdate.DateOrder;
                order.IsDelete = orderPitchUpdate.IsDelete;
                order.Note = orderPitchUpdate.Note;
                order.CreateTime = orderPitchUpdate.CreateTime;
                order.UpdateTime = DateTime.Now;
                order.PhoneOrder = orderPitchUpdate.PhoneOrder;
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
