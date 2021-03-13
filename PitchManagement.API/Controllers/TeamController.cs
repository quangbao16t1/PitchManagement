using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Interfaces;
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

        [HttpPut("{id}")]
        public async Task<bool> UpdateOne(int id, [FromBody] TeamForUpdate teamForUpdate)
        {
            await _teamRepo.UpdateTeamAsync(id, teamForUpdate);
            return true;
        }
    }
}
