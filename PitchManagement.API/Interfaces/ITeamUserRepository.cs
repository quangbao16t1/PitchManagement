using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface ITeamUserRepository
    {
        IEnumerable<TeamUser> GetAllTeamUsers();
        Task<TeamUser> GetTeamUserByIdAsnyc(int id);
        Task<bool> CreateTeamUserAsync(TeamUser teamUser);
        Task<bool> UpdateTeamUserAsync(int id, TeamUser teamUser);
        Task<bool> DeleteTeamUserAsync(int id);
    }
}
