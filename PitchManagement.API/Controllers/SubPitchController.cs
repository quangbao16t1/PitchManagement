using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.SubPitches;
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
    public class SubPitchController : ControllerBase
    {
        private readonly ISubPitchRepository _subPitchRepo;
        private readonly IMapper _mapper;

        public SubPitchController(ISubPitchRepository subPitchRepo, IMapper mapper)
        {
            _subPitchRepo = subPitchRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllSubPitchs(string keyword)
        {

            var listSubPicth = _subPitchRepo.GetAllSubPitch(keyword);

            return Ok(_mapper.Map<IEnumerable<SubPitchReturn>>(listSubPicth));
            //return Ok(listUsers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubPitchById(int id)
        {
            var subPitch = await _subPitchRepo.GetSubPitchByIdAsync(id);
            if (subPitch == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<SubPitchReturn>(subPitch));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubPitch([FromBody] SubPitchUI subPitchCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var subPitch = _mapper.Map<SubPitch>(subPitchCreate);

            var result = await _subPitchRepo.CreateSubPitchAsync(subPitch);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubPitch(int id, [FromBody] SubPitchUI subPitchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subPitch = _mapper.Map<SubPitch>(subPitchUpdate);

            var result = await _subPitchRepo.UpdateSubPitchAsync(id, subPitch);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubPitch(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _subPitchRepo.DeleteSubPitchAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
