using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Wards;
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
    public class WardController : ControllerBase
    {
        private readonly IWardRepository _wardRepo;
        private readonly IMapper _mapper;

        public WardController(IWardRepository wardRepo, IMapper mapper)
        {
            _wardRepo = wardRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllWard(string keyword)
        {
            var listWard = _wardRepo.GetAllWard(keyword);
            return Ok(_mapper.Map<IEnumerable<WardReturn>>(listWard));
        }

        [Route("GetAllWardByDistrict")]
        [HttpGet]
        public IActionResult GetAllWardByDistrict(int districtId)
        {
            var listWard = _wardRepo.GetAllWardByDistrict(districtId);
            return Ok(_mapper.Map<IEnumerable<WardReturn>>(listWard));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllWardById(int id)
        {
            var ward = await _wardRepo.GetWardByIdAsync(id);
            if (ward == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<WardReturn>(ward));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWard([FromBody] WardUI wardAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ward = _mapper.Map<Ward>(wardAdd);
            var result = await _wardRepo.CreateWardAsync(ward);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWard(int id, [FromBody] WardUI wardUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ward = _mapper.Map<Ward>(wardUpdate);
            var result = await _wardRepo.UpdateWardAsync(id, ward);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWard(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _wardRepo.DeleteWardAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
