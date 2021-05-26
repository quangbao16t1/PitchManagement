using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.TeamUser;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamUserController : ControllerBase
    {
        private readonly ITeamUserRepository _teamUserRepo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;

        public TeamUserController(ITeamUserRepository teamUserRepo, IMapper mapper, IUserRepository userRepo)
        {
            _teamUserRepo = teamUserRepo;
            _mapper = mapper;
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetAllTeamUser(string keyword, int page = 1, int pagesize = 10)
        {
           try
            {
                var listTeamUser = _teamUserRepo.GetAllTeamUsers(keyword);

                int totalCount = listTeamUser.Count();

                var query = listTeamUser.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<TeamUser>, IEnumerable<TeamUserReturn>>(query);

                var paginationset = new PaginationSet<TeamUserReturn>()
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

        [Route("GetTeamByUser")]
        [HttpGet]
        public async Task<IActionResult> GetTeamByUser(int userId)
        {
            try
            {
                var listTeamUser = _teamUserRepo.GetTeamByUser(userId);

                var response = _mapper.Map<IEnumerable<TeamUser>, IEnumerable<TeamUserReturn>>(listTeamUser);

                List<AllTeamUser> listTeam = new List<AllTeamUser>();

                foreach (TeamUserReturn item in response)
                {
                    var userCreate1 = await _userRepo.GetUserByIdAsync(item.CreateBy);

                    UserDto userCreate = _mapper.Map<UserDto>(userCreate1);

                    AllTeamUser temp = new AllTeamUser
                    {
                        Id = item.Id,
                        TeamId = item.TeamId,
                        TeamName = item.TeamName,
                        UserCreate =userCreate,
                        Description = item.Description,
                        Level = item.Level,
                        Logo = item.Logo,
                        ImageUrl = item.ImageUrl,
                        AgeFrom = item.AgeFrom,
                        AgeTo = item.AgeTo,
                        DateOfWeek = item.DateOfWeek,
                        StartTime = item.StartTime
                    };

                    listTeam.Add(temp);
                }
                return Ok(listTeam);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [Route("GetMember")]
        [HttpGet]
        public IActionResult GetMember(int teamId, string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listTeamUser = _teamUserRepo.GetMemBerByTeamId(teamId, keyword);

                int totalCount = listTeamUser.Count();

                var query = listTeamUser.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<TeamUser>, IEnumerable<TeamUserMember>>(query);

                var paginationset = new PaginationSet<TeamUserMember>()
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

        [Route("GetTeamByUserId")]
        [HttpGet]
        public async Task<IActionResult>  GetTeamByUserId(int userId)
        {
            var teamUser = await _teamUserRepo.GetTeamByUserId(userId);
            if (teamUser == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<TeamUserReturn>(teamUser));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllTeamUserById(int id)
        {
            var teamUser = await _teamUserRepo.GetTeamUserByIdAsnyc(id);
            if (teamUser == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<TeamUserReturn>(teamUser));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeamUser([FromBody] TeamUserUI teamUserAdd)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var teamUser = _mapper.Map<TeamUser>(teamUserAdd);
            var result = await _teamUserRepo.CreateTeamUserAsync(teamUser);
            if (result)
                return Ok();

            return BadRequest();

        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeamUser(int id, [FromBody] TeamUserUI teamUserUpdate)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var teamUser = _mapper.Map<TeamUser>(teamUserUpdate);
            var result = await _teamUserRepo.UpdateTeamUserAsync(id, teamUser);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           
            var result = await _teamUserRepo.DeleteTeamUserAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
