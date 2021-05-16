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
    public class MatchRepository : IMatchRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MatchRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CatchMatch(int id, Match matchUpdate)
        {
            var matchInDb = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);
            if (matchInDb == null)
                return false;
            try
            {
                matchInDb.ReceiverId = matchUpdate.ReceiverId;
                matchInDb.Status = 3; // đợi người đăng xác nhận
                matchInDb.UpdateTime = DateTime.Now;
                matchInDb.Note = matchUpdate.Note;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> CancelMatch(int id, Match matchUpdate)
        {
            var matchInDb = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);
            if (matchInDb == null)
                return false;
            try
            {
                matchInDb.TeamId = matchUpdate.TeamId;
                matchInDb.SetupTime = matchUpdate.SetupTime;
                matchInDb.Type = matchUpdate.Type;
                if(matchUpdate.PitchId == 0)
                {
                    matchInDb.PitchId = null;
                }
                matchInDb.Covenant = matchUpdate.Covenant;
                matchInDb.Level = matchUpdate.Level;
                matchInDb.invitation = matchUpdate.invitation;
                matchInDb.InviteeId = matchUpdate.InviteeId;
                matchInDb.ReceiverId = matchUpdate.ReceiverId;
                matchInDb.Status = 2; // hủy 
                matchInDb.UpdateTime = DateTime.Now;
                matchInDb.Area = matchUpdate.Area;
                matchInDb.Note = matchUpdate.Note;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw ex;
            }
        }

        public async Task<bool> DestroyMatch(int id, Match matchUpdate)
        {
            var matchInDb = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);
            if (matchInDb == null)
                return false;
            try
            {
                matchInDb.ReceiverId = 0;
                matchInDb.Status = 0; 
                matchInDb.UpdateTime = DateTime.Now;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> ConfirmMatch(int id, Match matchUpdate)
        {
            var matchInDb = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);
            if (matchInDb == null)
                return false;
            try
            {
                matchInDb.Status = 1; // xác nhận kèo đấu
                matchInDb.UpdateTime = DateTime.Now;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> CreateMatchAsync(Match matchCreate)
        {
            try
            {
                if(matchCreate.PitchId==0)
                {
                    matchCreate.PitchId = null;
                }
                matchCreate.Status = 0;
                _context.Matches.Add(matchCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteMatchAsync(int id)
        {
            var matchInDB = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);

            if (matchInDB == null)
            {
                return false;
            }

            try
            {
                _context.Matches.Remove(matchInDB);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Match> GetAllMatch(string keyword)
        {
            return _context.Matches
                .Include(x => x.Team).Include(y => y.Pitch).ThenInclude(y => y.District).AsEnumerable();
        }

        public async Task<Match> GetMatchByIdAsync(int id)
        {
            return await _context.Matches.Include(x => x.Team).Include(y => y.Pitch).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateMatchAsync(int id, Match matchUpdate)
        {
            var matchInDb = await _context.Matches.FirstOrDefaultAsync(x => x.Id == id);
            if (matchInDb == null)
                return false;
            try
            {
                matchInDb.TeamId = matchUpdate.TeamId;
                matchInDb.SetupTime = matchUpdate.SetupTime;
                matchInDb.Type = matchUpdate.Type;
                matchInDb.PitchId = matchUpdate.PitchId;
                matchInDb.Covenant = matchUpdate.Covenant;
                matchInDb.Level = matchUpdate.Level;
                matchInDb.invitation = matchUpdate.invitation;
                matchInDb.InviteeId = matchUpdate.InviteeId;
                matchInDb.ReceiverId = matchUpdate.ReceiverId;
                matchInDb.Status = matchUpdate.Status;
                matchInDb.CreateTime = matchUpdate.CreateTime;
                matchInDb.UpdateTime = DateTime.Now;
                matchInDb.Area = matchUpdate.Area;
                matchInDb.Note = matchUpdate.Note;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Match> GetListCatchByStatus(string keyword)
        {
            if(string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.Matches
                .Include(x => x.Team).Include(y => y.Pitch).ThenInclude(y => y.District)
                .Where(x => x.Status == 0)
                 .Where(x => x.Level.ToLower().Contains(keyword.ToLower()) ||  x.Pitch.Name.ToLower().Contains(keyword.ToLower()))
             .AsEnumerable();
        }

        public IEnumerable<Match> GetMatchByStatus(int status, string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            if(status == -1  )
            {
                return _context.Matches
                .Include(x => x.Team).Include(y => y.Pitch).ThenInclude(y => y.District)
                 .Where(x => x.Level.ToLower().Contains(keyword.ToLower()) || x.Pitch.Name.ToLower().Contains(keyword.ToLower()))
             .AsEnumerable();
            }    

            return _context.Matches
                .Include(x => x.Team).Include(y => y.Pitch).ThenInclude(y => y.District)
                .Where(x => x.Status == status)
                 .Where(x => x.Level.ToLower().Contains(keyword.ToLower()) || x.Pitch.Name.ToLower().Contains(keyword.ToLower()))
             .AsEnumerable();
        }
    }
}
