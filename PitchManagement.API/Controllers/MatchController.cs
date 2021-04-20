using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
using PitchManagement.API.Dtos.Matches;
using PitchManagement.API.Dtos.Pitches;
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
    public class MatchController : ControllerBase
    {
        private readonly IMatchRepository _matchRepo;
        private readonly IMapper _mapper;

        public MatchController(IMatchRepository matchRepo, IMapper mapper)
        {
            _matchRepo = matchRepo;
            _mapper = mapper;
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
