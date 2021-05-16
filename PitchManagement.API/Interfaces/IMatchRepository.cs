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
        IEnumerable<Match> GetListCatchByStatus(string keyword);
        IEnumerable<Match> GetMatchByStatus(int status, string keyword);
        Task<Match> GetMatchByIdAsync(int id);
        Task<bool> CreateMatchAsync(Match matchCreate);
        Task<bool> UpdateMatchAsync(int id, Match matchUpdate);
        Task<bool> CancelMatch(int id, Match matchUpdate);
        Task<bool> DestroyMatch(int id, Match matchUpdate);
        Task<bool> ConfirmMatch(int id, Match matchUpdate);
        Task<bool> CatchMatch(int id, Match matchUpdate);
        Task<bool> DeleteMatchAsync(int id);
    }
}
