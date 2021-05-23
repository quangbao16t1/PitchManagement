using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
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
        public IActionResult GetAllPitches(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listPicth = _PitchRepo.GetAllPitch(keyword);

                int totalCount = listPicth.Count();

                var query = listPicth.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<PitchReturn>>(query);

                var paginationset = new PaginationSet<PitchReturn>()
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

        [Route("GetPitchByDistrict")]
        [HttpGet]
        public IActionResult GetPicthByDistrict(int districtId)
        {
                var listPicth = _PitchRepo.GetPitchByDistrict(districtId);

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
        public  IActionResult GetPitchId(int userId)
        {
            var pitchId =   _PitchRepo.GetIdPitch(userId);  
            return Ok(_mapper.Map< IEnumerable<int>>(pitchId));
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
