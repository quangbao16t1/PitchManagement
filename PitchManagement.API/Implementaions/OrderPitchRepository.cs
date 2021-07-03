using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PitchManagement.API.Dtos.OrderPitches;
using PitchManagement.API.Helper;
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
        private readonly IEmailSender _emailSender;
        public OrderPitchRepository(DataContext context, IMapper mapper, IEmailSender emailSender)
        {
            _context = context;
            _mapper = mapper;
            _emailSender = emailSender;
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

        public IEnumerable<OrderPitch> GeOrderPitchByPitchId(int pitchId, int status)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.SubPitchDetail.SubPitch.PitchId == pitchId && x.Status == status).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GeOrderPitchByUserId(int userId)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.UserId == userId).AsEnumerable();
        }

        public IEnumerable<OrderPitch> GetOrderPitchByDate(DateTime dateOrder, int userId)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.DateOrder.Year == dateOrder.Year && x.DateOrder.Month == dateOrder.Month && x.DateOrder.Day == dateOrder.Day && x.UserId == userId).AsEnumerable();
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

                var pitch = await _context.OrderPitches
                  .Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch).ThenInclude(x => x.Pitch)
                 .Include(x => x.User).Include(x => x.SubPitchDetail).FirstOrDefaultAsync(x => x.Id == id);

                //Test send mail
                User customerUser = _context.Users.FirstOrDefault(x => x.Id == order.UserId);
                string content = "Xin Chào, " + customerUser.FirstName + " " + customerUser.LastName + "\n Cảm ơn bạn đã tin tưởng chúng tôi. \n Bạn đã đặt sân bóng " + pitch.SubPitchDetail.SubPitch.Pitch.Name + " thành công!"
                    + " Trận đấu của bạn bắt đầu lúc " + pitch.SubPitchDetail.StartTime + " ngày " + pitch.DateOrder.ToString("dd/MM/yyyy") + " \n Hãy đến đúng giờ. Chúc bạn sức khỏe." ;
                var message = new Message(new string[] { customerUser.Email }, "Đặt sân thành công", content);
                await _emailSender.SendEmailAsync(message);

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<OrderPitch> GetOrderByDatePitchId(DateTime dateOrder, int pitchId)
        {
            return _context.OrderPitches
               .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
               .ThenInclude(x => x.Pitch).Where(x => x.SubPitchDetail.SubPitch.PitchId == pitchId && x.DateOrder.Year == dateOrder.Year && x.DateOrder.Month == dateOrder.Month && x.DateOrder.Day == dateOrder.Day).AsEnumerable();
        }

        public IEnumerable<RevenueUI> GetRevenueMonth(int pitchId, DateTime date)
        {
            List<RevenueUI> list = new List<RevenueUI>();
            int totalRevenue;
            RevenueUI RevenueUI;
            dynamic revenue;

               revenue = _context.OrderPitches.Include(x =>x.SubPitchDetail).ThenInclude(x => x.SubPitch).Where(x => x.DateOrder.Year == date.Year && x.DateOrder.Month == date.Month  && x.SubPitchDetail.SubPitch.PitchId == pitchId && x.Status == 1).AsEnumerable();
            for (int i = 1; i <= DateTime.DaysInMonth(date.Year, date.Month); i++)
            {
                totalRevenue = 0;
                RevenueUI = new RevenueUI();

                foreach (var item in revenue)
                {
                    if (item.DateOrder.Day == i)
                    {
                        totalRevenue += item.SubPitchDetail.Cost;
                    }
                }
                RevenueUI.TotalRevenue = totalRevenue;
                RevenueUI.datetime = new DateTime(date.Year, date.Month, i);

                list.Add(RevenueUI);
            }
            return list.AsEnumerable();
        }

        public async Task<bool> CancelOrderPitchAsync(int id, OrderPitch orderPitchUpdate)
        {
            var order = await _context.OrderPitches.FirstOrDefaultAsync(x => x.Id == id);
            if (order == null) return false;

            try
            {
                order.Status = 2; // đã hủy
                order.UpdateTime = DateTime.Now;
                await _context.SaveChangesAsync();

                var pitch = await _context.OrderPitches
                  .Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch).ThenInclude(x => x.Pitch)
                 .Include(x => x.User).Include(x => x.SubPitchDetail).FirstOrDefaultAsync(x => x.Id == id);

                //Test send mail
                User customerUser = _context.Users.FirstOrDefault(x => x.Id == order.UserId);
                string content = "Xin Chào, " + customerUser.FirstName + " " + customerUser.LastName + "\n Cảm ơn bạn đã tin tưởng chúng tôi. \n Yêu cầu đặt sân bóng " + pitch.SubPitchDetail.SubPitch.Pitch.Name + " của bạn không thành công!"
                    + " \n Xin lỗi vì sự bất tiện này. Chúc bạn sức khỏe.";
                var message1 = new Message(new string[] { customerUser.Email }, "Đặt sân không thành công", content);
                await _emailSender.SendEmailAsync(message1);

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<OrderPitch> HistoryOrderPitcher(int pitchId)
        {
            return _context.OrderPitches
                .Include(x => x.User).Include(x => x.SubPitchDetail).ThenInclude(x => x.SubPitch)
                .ThenInclude(x => x.Pitch).Where(x => x.SubPitchDetail.SubPitch.PitchId == pitchId).AsEnumerable();
        }
    }
}
    
