using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public TeamController(ITeamRepository teamRepo, IMapper mapper)
        {
            _teamRepo = teamRepo;
             _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllTeams(string keyword)
        {

            var listUsers = _teamRepo.GetAllTeam(keyword);

            return Ok(_mapper.Map<IEnumerable<TeamUI>>(listUsers));
            //return Ok(listUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            var team = await _teamRepo.GetTeamByIdAsync(id);
            if(team == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TeamUI>(team));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] TeamForCreate teamForCreate)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _teamRepo.CreateTeamAsync(teamForCreate);
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
