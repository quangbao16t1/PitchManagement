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
    public class TeamRepository : ITeamRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TeamRepository(DataContext context, Mapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> CreateTeamAsync(Team team)
        {
            try
            {
                _context.Teams.Add(team);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                throw ;
            }
        }

        public async Task<bool> DeleteTeamAsync(int id)
        {
            var teamInDb = await _context.Teams.FirstOrDefaultAsync(p => p.Id == id);
            if (teamInDb == null)
                return false;
            try
            {
                _context.Teams.Remove(teamInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                throw;
            }
        }

        public IEnumerable<Team> GetAllTeam(string keyword)
        {
            if(string.IsNullOrEmpty(keyword)) keyword = "";
            return  _context.Teams.Where(x => x.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<Team> GetTeamByIdAsync(int id)
        {
            return await _context.Teams.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> UpdateTeamAsync(int id, Team team)
        {
            var teamInDb = await _context.Teams.FirstOrDefaultAsync(p => p.Id == id);
            if (teamInDb == null)
            {
                return false;
            }
            try
            {
                teamInDb.Name = team.Name;
                teamInDb.Area = team.Area;
                teamInDb.CreateBy = team.CreateBy;
                teamInDb.Description = team.Description;
                teamInDb.Matches = team.Matches;
                teamInDb.Level = team.Level;
                teamInDb.Logo = team.Logo;
                teamInDb.PitchSubId = team.PitchSubId;
                teamInDb.TeamImage = team.TeamImage;
                team.StartTime = team.StartTime;
                teamInDb.AgeFrom = team.AgeFrom;
                teamInDb.AgeTo = team.AgeTo;
                teamInDb.DateOfWeek = team.DateOfWeek;
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
