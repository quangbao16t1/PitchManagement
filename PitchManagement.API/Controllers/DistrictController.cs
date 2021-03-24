using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Districts;
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
    public class DistrictController : ControllerBase
    {
        private readonly IDistrictRepository _districtRepo;
        private readonly IMapper _mapper;

        public DistrictController(IDistrictRepository districtRepo, IMapper mapper)
        {
            _districtRepo = districtRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllDistrict(string keyword)
        {
            var listDistrict = _districtRepo.GetAllDistrict(keyword);
            return Ok(_mapper.Map<IEnumerable<DistrictReturn>>(listDistrict));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllDistrictById(int id)
        {
            var district = await _districtRepo.GetDistrictByIdAsync(id);
            if (district == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<DistrictReturn>(district));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDistrict([FromBody] DistrictUI districtAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var district = _mapper.Map<District>(districtAdd);
            var result = await _districtRepo.CreateDistrictAsync(district);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDistrict(int id, [FromBody] DistrictUI districtUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var district = _mapper.Map<District>(districtUpdate);
            var result = await _districtRepo.UpdateDistrictAsync(id, district);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDistrict(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _districtRepo.DeleteDistrictAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
