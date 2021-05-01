using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class PitchController : ControllerBase
    {

        private readonly IPitchRepository _PitchRepo;
        private readonly IMapper _mapper;

        public PitchController(IPitchRepository PitchRepo, IMapper mapper)
        {
            _PitchRepo = PitchRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllPitches(string keyword)
        {

            var listPicth = _PitchRepo.GetAllPitch(keyword);

            return Ok(_mapper.Map<IEnumerable<PitchReturn>>(listPicth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPitchById(int id)
        {
            var pitch = await _PitchRepo.GetPitchByIdAsync(id);
            if (pitch == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<PitchReturn>(pitch));
        }

        [Route("GetPitchId")]
        [HttpGet]
        public async Task<int> GetPitchId(int userId)
        {
            int pitchId =  await _PitchRepo.GetIdPitch(userId);  
            return pitchId;
        }

        [Route("GetPitchByUserId")]
        [HttpGet]
        public IActionResult GetPitchCreateBy(int userId)
        {
            var pitch =  _PitchRepo.GetPitchCreateBy(userId);
            if (pitch == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<IEnumerable<PitchReturn>>(pitch));
        }
        
        [HttpPost]
        public async Task<IActionResult> CreatePitch([FromBody] PitchUI pitchCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var pitch = _mapper.Map<Pitch>(pitchCreate);

            var result = await _PitchRepo.CreatePitchAsync(pitch);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePitch(int id, [FromBody] PitchUI pitchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pitch = _mapper.Map<Pitch>(pitchUpdate);

            var result = await _PitchRepo.UpdatePitchAsync(id, pitch);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePitch(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _PitchRepo.DeletePitchAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
