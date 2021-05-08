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
    public class TeamUserRepository : ITeamUserRepository
    {
        private readonly DataContext _context;

        public TeamUserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateTeamUserAsync(TeamUser teamUser)
        {
            try
            {
                _context.TeamUsers.Add(teamUser);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteTeamUserAsync(int id)
        {
            var teamUserInDb = await _context.TeamUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (teamUserInDb == null)
                return false;
            try
            {
                _context.Remove(teamUserInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TeamUser> GetAllTeamUsers(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.TeamUsers.Include(x => x.Team).Include(y => y.User).Where(x => x.Team.Name.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public IEnumerable<TeamUser> GetMemBerByTeamId(int teamId, string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.TeamUsers.Include(x => x.Team).Include(y => y.User)
                .Where(z => z.TeamId == teamId).Where(y => y.User.Username.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<TeamUser> GetTeamByUserId(int userId)
        {
            return await _context.TeamUsers.Include(x => x.Team).Include(y => y.User).FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<TeamUser> GetTeamUserByIdAsnyc(int id)
        {
            return await _context.TeamUsers.Include(x => x.Team).Include(y => y.User).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateTeamUserAsync(int id, TeamUser teamUser)
        {
            var teamUserInDb = await _context.TeamUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (teamUserInDb == null)
                return false;
            try
            {
                teamUserInDb.TeamId = teamUser.TeamId;
                teamUserInDb.UserId = teamUser.UserId;
                teamUserInDb.Description = teamUser.Description;
                teamUserInDb.CreateTime = teamUser.CreateTime;
                teamUserInDb.UpdateTime = teamUser.UpdateTime;
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
