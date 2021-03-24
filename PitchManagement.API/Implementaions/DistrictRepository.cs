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
    public class DistrictRepository : IDistrictRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DistrictRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateDistrictAsync(District districtAdd)
        {
            try
            {
                _context.Districts.Add(districtAdd);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteDistrictAsync(int id)
        {
            var districtInDb = await _context.Districts.FirstOrDefaultAsync(x => x.Id == id);

            if (districtInDb == null)
            {
                return false;
            }

            try
            {
                _context.Districts.Remove(districtInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<District> GetAllDistrict(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.Districts.Include(x => x.Province).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<District> GetDistrictByIdAsync(int id)
        {
            return await _context.Districts.Include(x => x.Province).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateDistrictAsync(int id, District district)
        {
            var districtInDb = await _context.Districts.FirstOrDefaultAsync(p => p.Id == id);
            if (districtInDb == null)
            {
                return false;
            }
            try
            {
                districtInDb.Name = district.Name;
                districtInDb.Type = district.Type;
                districtInDb.ProvinceId = district.ProvinceId;


                _context.Districts.Update(districtInDb);
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
