using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.Teams;
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
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        private readonly ITeamUserRepository _teamUserRepo;

        public TeamController(ITeamRepository teamRepo, IMapper mapper, IUserRepository userRepo, ITeamUserRepository teamUserRepo)
        {
            _teamRepo = teamRepo;
             _mapper = mapper;
            _userRepo = userRepo;
            _teamUserRepo = teamUserRepo;
        }

        [HttpGet]
        public IActionResult GetAllTeams(string keyword)
        {

            var listTeams = _teamRepo.GetAllTeam(keyword);

            return Ok(_mapper.Map<IEnumerable<TeamUI>>(listTeams));
            //return Ok(listUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
             try
            {
                var team = await _teamRepo.GetTeamByIdAsync(id);

                if (team == null)
                {
                    return NotFound();
                }

                var response = _mapper.Map<TeamUI>(team);

                var userCreate1 = await _userRepo.GetUserByIdAsync(response.CreateBy);

                    UserDto userCreate = _mapper.Map<UserDto>(userCreate1);

                    TeamReturn teamReturn = new TeamReturn
                    {
                        Id = response.Id,
                        Name = response.Name,
                        UserCreate = userCreate,
                        Description = response.Description,
                        Level = response.Level,
                        Logo = response.Logo,
                        ImageUrl = response.ImageUrl,
                        AgeFrom = response.AgeFrom,
                        AgeTo = response.AgeTo,
                        DateOfWeek = response.DateOfWeek,
                        StartTime = response.StartTime
                    };
                
                return Ok(teamReturn);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpGet("GetTeamByUserCreate/{userId}")]
        public async Task<IActionResult> GetTeamByUserCreate(int userId)
        {
            try
            {
                var team = await _teamRepo.GetTeamByUserCreate(userId);

                if (team == null)
                {
                    return NotFound();
                }

                return Ok(_mapper.Map<TeamUI>(team));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] TeamForCreate teamForCreate)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _teamRepo.CreateTeamAsync(teamForCreate);
            
            var team = await _teamRepo.GetTeamByUserCreate(teamForCreate.CreateBy);
            TeamUser teamUser = new TeamUser
            {
                TeamId = team.Id,
                UserId = team.CreateBy,
                Description = "",
            };

            await _teamUserRepo.CreateTeamUserAsync(teamUser);

            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOne(int id, [FromBody] TeamForUpdate teamForUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _teamRepo.UpdateTeamAsync(id, teamForUpdate);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result =  await _teamRepo.DeleteTeamAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
