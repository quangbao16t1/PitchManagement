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
    public class ServiceDetailRepository : IServiceDetailRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ServiceDetailRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateServiceDetailsync(ServiceDetail serviceDetail)
        {
            try
            {
                _context.ServiceDetails.Add(serviceDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteServiceDetailAsync(int id)
        {
            var ServiceDetail = await _context.ServiceDetails.FirstOrDefaultAsync(x => x.Id == id);

            if (ServiceDetail == null)
            {
                return false;
            }

            try
            {
                _context.ServiceDetails.Remove(ServiceDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ServiceDetail> GetAllServiceDetail(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.ServiceDetails.Include(x => x.SubPitch).Include(x => x.Service).AsEnumerable();
        }

        public async Task<ServiceDetail> GetSeviceDetailByIdAsync(int id)
        {
            return await _context.ServiceDetails.Include(x => x.SubPitch).Include(x => x.Service).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateServiceDetailAsync(int id, ServiceDetail serviceDetail)
        {
            var serviceDetailInDb = await _context.ServiceDetails.FirstOrDefaultAsync(p => p.Id == id);
            if (serviceDetailInDb == null)
            {
                return false;
            }
            try
            {
                serviceDetailInDb.ServiceId = serviceDetail.ServiceId;
                serviceDetailInDb.SubPitchId = serviceDetail.SubPitchId;
                serviceDetailInDb.StartTime = serviceDetail.StartTime;
                serviceDetailInDb.EndTime = serviceDetail.EndTime;
                serviceDetailInDb.Cost = serviceDetail.Cost;

                _context.ServiceDetails.Update(serviceDetailInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
