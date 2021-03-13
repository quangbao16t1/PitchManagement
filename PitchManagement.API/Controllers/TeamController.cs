using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Interfaces;
using System.Collections;
using System.Collections.Generic;
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
            var listTeam = _teamRepo.GetAllTeam(keyword);
            return Ok(_mapper.Map<IEnumerable<TeamUI>>(listTeam));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            var team = await _teamRepo.GetTeamByIdAsync(id);
            if(team == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map < TeamUI > (team));
        }
    }
}
