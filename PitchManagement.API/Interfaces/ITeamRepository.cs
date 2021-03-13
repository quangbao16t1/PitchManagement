using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface ITeamRepository
    {
        IEnumerable<Team> GetAllTeam(string keyword);
        Task<Team> GetTeamByIdAsync(int id);
        Task<bool> CreateTeamAsync(Team team);
        Task<bool> UpdateTeamAsync(int id, Team team);
        Task<bool> DeleteTeamAsync(int id);
    }
}
