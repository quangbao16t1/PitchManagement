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
    public class SubPitchRepository : ISubPitchRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SubPitchRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateSubPitchAsync(SubPitch subPitchCreate)
        {
            try
            {
                subPitchCreate.CreateTime = DateTime.Now;
                subPitchCreate.Status = 1;
                subPitchCreate.UpdateTime = null;
                _context.SubPitches.Add(subPitchCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteSubPitchAsync(int id)
        {
            var subPitchInDb = await _context.SubPitches.FirstOrDefaultAsync(x => x.Id == id);
            if(subPitchInDb == null)
            {
                return false;
            }
            try
            {
                _context.SubPitches.Remove(subPitchInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubPitch> GetAllSubPitch(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.SubPitches
                .Include(x => x.Pitch).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public IEnumerable<SubPitch>GetSubPitchByPitchId(int pitchId, string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.SubPitches.Include(x => x.Pitch).Where(y => y.PitchId == pitchId).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable().Distinct();
        }

        public async Task<SubPitch> GetSubPitchByIdAsync(int id)
        {
            return await _context.SubPitches.Include(x => x.Pitch).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateSubPitchAsync(int id, SubPitch subPitchUpdate)
        {
            var subPitchInDb = await _context.SubPitches.FirstOrDefaultAsync(x => x.Id == id);
            if (subPitchUpdate == null)
                return false;
            try
            {
                subPitchInDb.Name = subPitchUpdate.Name;
                subPitchInDb.Status = subPitchUpdate.Status;
                subPitchInDb.UpdateTime = DateTime.Now;
                subPitchInDb.Type = subPitchUpdate.Type;
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
