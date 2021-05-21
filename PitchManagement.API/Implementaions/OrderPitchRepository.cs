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
                orderPitchCreate.CreateTime = DateTime.Now;
                orderPitchCreate.Status = 0; // Đang chờ xác nhận
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
            var orderInDb = await _context.OrderPitches.FirstOrDefaultAsync(x => x.Id == id);

            if (orderInDb == null)
            {
                return false;
            }

            try
            {
                _context.OrderPitches.Remove(orderInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<OrderPitch> GeOrderPitchByPitchId(int pitchId)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.SubPitchDetail.SubPitch.PitchId == pitchId).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GeOrderPitchByUserId(int userId)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.UserId == userId).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GeOrderPitchByUserId(DateTime dateOrder)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.DateOrder == dateOrder).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GetAllOrderPitch(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.OrderPitches
                 .Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch).ThenInclude(x => x.Pitch)
                .Include(x => x.User).Include(x => x.SubPitchDetail).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GetOrderPitchByDate(DateTime dateOrder)
        {
            throw new NotImplementedException();
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
                order.Status = 1;
                order.UpdateTime = DateTime.Now;
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
