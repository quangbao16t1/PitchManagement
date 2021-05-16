using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.Matches;
using PitchManagement.API.Dtos.Pitches;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace PitchManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly IMatchRepository _matchRepo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        public MatchController(IMatchRepository matchRepo, IMapper mapper,IUserRepository userRepo)
        {
            _matchRepo = matchRepo;
            _mapper = mapper;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetAllMatch(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listMatch = _matchRepo.GetAllMatch(keyword);

                int totalCount = listMatch.Count();

                var query = listMatch.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Match>, IEnumerable<MatchReturn>>(query);

                var paginationset = new PaginationSet<MatchReturn>()
                {
                    Items = response,
                    Total = totalCount
                };
                return Ok(paginationset);
            }

            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Route("GetListCatch")]
        [HttpGet]
        public IActionResult GetListCatch(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listMatch = _matchRepo.GetListCatchByStatus(keyword);

                int totalCount = listMatch.Count();

                var query = listMatch.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Match>, IEnumerable<MatchReturn>>(query);

                var paginationset = new PaginationSet<MatchReturn>()
                {
                    Items = response,
                    Total = totalCount
                };
                return Ok(paginationset);
            }

            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [Route("GetMatchByStatus")]
        [HttpGet]
        public async Task<IActionResult> GetMatchByStatus(int status, string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listMatch = _matchRepo.GetMatchByStatus(status, keyword);

                int totalCount = listMatch.Count();

                var query = listMatch.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<Match>, IEnumerable<MatchReturn>>(query);

                List<MatchByStatus> listMatchStatus = new List<MatchByStatus>();

                foreach (MatchReturn item in response)
                {
                    var userInvite1 = await _userRepo.GetUserByIdAsync(item.InviteeId);
                    UserDto userInvite = _mapper.Map<UserDto>(userInvite1);

                    UserDto userReceive = null;

                    if (item.ReceiverId != 0)
                    {
                       var userReceive1 = await _userRepo.GetUserByIdAsync(item.ReceiverId);
                        userReceive = _mapper.Map<UserDto>(userReceive1);
                    }

                    MatchByStatus temp = new MatchByStatus
                    {
                        Id = item.Id,
                        TeamId = item.TeamId,
                        TeamName = item.TeamName,
                        PitchId = item.PitchId,
                        PitchName = item.PitchName,
                        DistrictName = item.DistrictName,
                        Covenant = item.Covenant,
                        Level = item.Level,
                        Invitation = item.invitation,
                        UserInvite = userInvite,
                        UserReceive = userReceive,
                        Status = item.Status,
                        CreateTime = item.CreateTime,
                        UpdateTime = item.UpdateTime,
                        Area = item.Area,
                        Note = item.Note
                        
                    };

                    listMatchStatus.Add(temp);
                }



                var paginationset = new PaginationSet<MatchByStatus>()
                {
                    Items = listMatchStatus,
                    Total = totalCount
                };
                
                return Ok(paginationset);
            }

            catch (Exception ex)
            {

                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMatchByIdAsync(int id)
        {
            var matchById = await _matchRepo.GetMatchByIdAsync(id);
            if (matchById == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<MatchReturn>(matchById));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMatch([FromBody] MatchUI matchCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var match = _mapper.Map<Match>(matchCreate);

            var result = await _matchRepo.CreateMatchAsync(match);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatch(int id, [FromBody] MatchUI matchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = _mapper.Map<Match>(matchUpdate);

            var result = await _matchRepo.UpdateMatchAsync(id, match);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("CatchMatch/{id}")]
        public async Task<IActionResult> CatchMatch(int id, [FromBody] MatchUI matchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = _mapper.Map<Match>(matchUpdate);

            var result = await _matchRepo.CatchMatch(id, match);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("CancelMatch/{id}")]
        public async Task<IActionResult> CancelMatch(int id, [FromBody] MatchUI matchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = _mapper.Map<Match>(matchUpdate);

            var result = await _matchRepo.CancelMatch(id, match);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("DestroyMatch/{id}")]
        public async Task<IActionResult> DestroyMatch(int id, [FromBody] MatchUI matchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = _mapper.Map<Match>(matchUpdate);

            var result = await _matchRepo.DestroyMatch(id, match);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("ConfirmMatch/{id}")]
        public async Task<IActionResult> ConfirmMatch(int id, [FromBody] MatchUI matchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var match = _mapper.Map<Match>(matchUpdate);

            var result = await _matchRepo.ConfirmMatch(id, match);
            if (result)
                return Ok();

            return BadRequest();
        }
            
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _matchRepo.DeleteMatchAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
