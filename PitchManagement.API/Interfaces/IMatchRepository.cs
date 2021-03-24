using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IMatchRepository
    {
        IEnumerable<Match> GetAllMatch(string keyword);
        Task<Match> GetMatchByIdAsync(int id);
        Task<bool> CreateMatchAsync(Match matchCreate);
        Task<bool> UpdateMatchAsync(int id, Match matchUpdate);
        Task<bool> DeleteMatchAsync(int id);
    }
}
