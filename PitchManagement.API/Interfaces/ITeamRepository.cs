using PitchManagement.API.Dtos.Teams;
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
        //Task<Team> GetTeamByIdAsync(int id);
        //Task<bool> CreateTeamAsync(Team teamForCreate);
        Task<bool> UpdateTeamAsync(int id, TeamForUpdate teamForUpdate);
        //Task<bool> DeleteTeamAsync(int id);
    }
}
