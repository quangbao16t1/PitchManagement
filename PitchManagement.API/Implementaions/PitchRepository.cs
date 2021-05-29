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
    public class PitchRepository : IPitchRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PitchRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreatePitchAsync(Pitch pitchCreate)
        {
            try
            {
                pitchCreate.Status = 1;
                pitchCreate.CreateTime = DateTime.Now;
                _context.Pitches.Add(pitchCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeletePitchAsync(int id)
        {
            var pitchInDB = await _context.Pitches.FirstOrDefaultAsync(x => x.Id == id);

            if (pitchInDB == null)
            {
                return false;
            }

            try
            {
                _context.Pitches.Remove(pitchInDB);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Pitch> GetAllPitch(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.Pitches
                .Include(x => x.District).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public  IEnumerable<int> GetIdPitch(int userId)
        {
            return  _context.Pitches.Where(y => y.CreateBy == userId).Select(y => y.Id).AsEnumerable();
        }

        public IEnumerable<Pitch> GetPitchByDistrict(int districtId)
        {
            return _context.Pitches.Include(x => x.District).Where(y => y.DistrictId == districtId).AsEnumerable();
        }

        public async Task<Pitch> GetPitchByIdAsync(int id)
        {

            return await _context.Pitches.Include(x => x.District).FirstOrDefaultAsync(x => x.Id == id);
        }

        public IEnumerable<Pitch> GetPitchCreateBy(int userId)
        {
            return  _context.Pitches.Include(x => x.District).Where(y => y.CreateBy == userId).AsEnumerable();
        }

        public async Task<bool> UpdatePitchAsync(int id, Pitch pitchUpdate)
        {
            var pitchInDb = await _context.Pitches.FirstOrDefaultAsync(p => p.Id == id);
            if (pitchInDb == null)
            {
                return false;
            }
            try
            {
                pitchInDb.Name = pitchUpdate.Name;
                pitchInDb.Decription = pitchUpdate.Decription;
                pitchInDb.Email = pitchUpdate.Email;
                pitchInDb.PhoneNumber = pitchUpdate.PhoneNumber;
                pitchInDb.WebSite = pitchUpdate.WebSite;
                //pitchInDb.Avatar = pitchUpdate.Avatar;
                pitchInDb.Status = pitchUpdate.Status;
                pitchInDb.UpdateTime = DateTime.Now;
                pitchInDb.Address = pitchUpdate.Address;

                _context.Pitches.Update(pitchInDb);
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
