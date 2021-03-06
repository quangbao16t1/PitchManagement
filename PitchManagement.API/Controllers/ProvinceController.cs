using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Provinces;
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
    public class ProvinceController : ControllerBase
    {
        private readonly IProvinceRepository _provinceRepo;
        private readonly IMapper _mapper;

        public ProvinceController(IProvinceRepository provinceRepo, IMapper mapper)
        {
            _provinceRepo = provinceRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllProvince(string keyword)
        {
            var listProvince = _provinceRepo.GetAllProvince(keyword);
            return Ok(_mapper.Map<IEnumerable<ProvinceUI>>(listProvince));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllProvinceById(int id)
        {
            var province = await _provinceRepo.GetProvinceByIdAsync(id);
            if (province == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<ProvinceUI>(province));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProvince([FromBody] ProvinceUI provinceAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var province = _mapper.Map<Province>(provinceAdd);
            var result = await _provinceRepo.CreateProvinceAsync(province);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProvince(int id, [FromBody] ProvinceUI provinceUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var province = _mapper.Map<Province>(provinceUpdate);
            var result = await _provinceRepo.UpdateProvinceAsync(id, province);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvince(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _provinceRepo.DeleteProvinceAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
