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
        public async Task<bool> CreateMatchAsync(Match matchCreate)
        {
            try
            {
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
                .Include(x => x.Team).Include(y => y.Pitch).AsEnumerable();
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
                matchInDb.UpdateTime = matchUpdate.UpdateTime;
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
    }
}
