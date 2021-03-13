using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Implementaions
{
    public class TeamRepository : ITeamRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TeamRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //public async Task<bool> CreateTeamAsync(Team teamForCreate)
        //{
        //    try
        //    {
        //        _context.Teams.Add(teamForCreate);
        //        await _context.SaveChangesAsync();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task<bool> DeleteTeamAsync(int id)
        //{
        //    var teamInDb = await _context.Teams.FirstOrDefaultAsync(x => x.Id == id);

        //    if (teamInDb == null)
        //    {
        //        return false;
        //    }

        //    try
        //    {
        //        _context.Teams.Remove(teamInDb);
        //        await _context.SaveChangesAsync();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public IEnumerable<Team> GetAllTeam(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.Teams
                .Include(x => x.SubPitch).Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
            //return _context.Teams
            //        .Where(x => true).ToList();
        }

        //public async Task<Team> GetTeamByIdAsync(int id)
        //{
        //    return await _context.Teams.Include(x => x.SubPitch).FirstOrDefaultAsync(x => x.Id == id);
        //}

        public async Task<bool> UpdateTeamAsync(int id, TeamForUpdate teamForUpdate)
        {
            var teamInDb = await _context.Teams.FirstOrDefaultAsync(p => p.Id == id);
            if (teamInDb == null)
            {
                return false;
            }
            try
            {
                teamInDb.Name = teamForUpdate.Name;
                teamInDb.Level = teamForUpdate.Level;
                teamInDb.ImageUrl = teamForUpdate.ImageUrl;
                teamInDb.Logo = teamForUpdate.Logo;
                teamInDb.SubPitchId = teamForUpdate.SubPitchId;
                teamInDb.TeamImage = teamForUpdate.TeamImage;
                teamInDb.StartTime = teamForUpdate.StartTime;
                teamInDb.CreateBy = teamForUpdate.CreateBy;
                teamInDb.CreateTime = teamForUpdate.CreateTime;
                teamInDb.UpdateTime = teamForUpdate.UpdateTime;
                teamInDb.AgeTo = teamForUpdate.AgeTo;
                teamInDb.AgeFrom = teamForUpdate.AgeFrom;
                teamInDb.DateOfWeek = teamForUpdate.DateOfWeek;
                teamInDb.Description = teamForUpdate.Description;

                _context.Teams.Update(teamInDb);
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
