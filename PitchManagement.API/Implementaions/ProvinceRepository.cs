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
    public class ProvinceRepository : IProvinceRepository
    {
        private readonly DataContext _context;

        public ProvinceRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateProvinceAsync(Province province)
        {
            try
            {
                _context.Provinces.Add(province);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteProvinceAsync(int id)
        {
            var provincesInDb = await _context.Provinces.FirstOrDefaultAsync(p => p.Id == id);
            if (provincesInDb == null)
            {
                return false;
            }
            try
            {
                _context.Provinces.Remove(provincesInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Province> GetAllProvince(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.Provinces.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();

        }

        public async Task<Province> GetProvinceByIdAsync(int id)
        {
            return await _context.Provinces.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateProvinceAsync(int id, Province province)
        {
            var provinces = await _context.Provinces.FirstOrDefaultAsync(p => p.Id == id);
            if (provinces == null)
            {
                return false;
            }
            try
            {
                provinces.Name = province.Name;
                provinces.Type = province.Type;
                

                _context.Provinces.Update(provinces);
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
