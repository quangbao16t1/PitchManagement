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
    public class ServiceRepository : IServiceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ServiceRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateServiceAsync(Service serviceAdd)
        {
            try
            {
                _context.Services.Add(serviceAdd);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteServiceAsync(int id)
        {
            var serviceInDb = await _context.Services.FirstOrDefaultAsync(x => x.Id == id);

            if (serviceInDb == null)
            {
                return false;
            }

            try
            {
                _context.Services.Remove(serviceInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Service> GetAllService(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.Services.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<Service> GetServiceByIdAsync(int id)
        {
            return await _context.Services.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateServiceAsync(int id, Service serviceUpdate)
        {
            var serviceInDb = await _context.Services.FirstOrDefaultAsync(p => p.Id == id);
            if (serviceInDb == null)
            {
                return false;
            }
            try
            {
                serviceInDb.Name = serviceUpdate.Name;
                serviceInDb.Description = serviceUpdate.Description;


                _context.Services.Update(serviceInDb);
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
