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
    public class WardRepository : IWardRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WardRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateWardAsync(Ward wardCreare)
        {
            try
            {
                _context.Wards.Add(wardCreare);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteWardAsync(int id)
        {
            var wardInDb = await _context.Wards.FirstOrDefaultAsync(x => x.Id == id);

            if (wardInDb == null)
            {
                return false;
            }

            try
            {
                _context.Wards.Remove(wardInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Ward> GetAllWard(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.Wards.Include(x => x.District).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<Ward> GetWardByIdAsync(int id)
        {
            return await _context.Wards.Include(x => x.District).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateWardAsync(int id, Ward wardUpdate)
        {
            var wardInDb = await _context.Wards.FirstOrDefaultAsync(p => p.Id == id);
            if (wardInDb == null)
            {
                return false;
            }
            try
            {
                wardInDb.Name = wardUpdate.Name;
                wardInDb.Type = wardUpdate.Type;
                wardInDb.DistrictId = wardUpdate.DistrictId;


                _context.Wards.Update(wardInDb);
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
