using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
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
        public IActionResult GetAllSubPitchs(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listSubPicth = _subPitchRepo.GetAllSubPitch(keyword);

                int totalCount = listSubPicth.Count();

                var query = listSubPicth.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<SubPitch>, IEnumerable<SubPitchReturn>>(query);

                var paginationset = new PaginationSet<SubPitchReturn>()
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

        [Route("GetSpByPitchId")]
        [HttpGet]
        public IActionResult GetSubPitchbyPitchId(int pitchId, string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listSubPicth = _subPitchRepo.GetSubPitchByPitchId(pitchId, keyword);

                int totalCount = listSubPicth.Count();

                var query = listSubPicth.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<SubPitch>, IEnumerable<SubPitchReturn>>(query);

                var paginationset = new PaginationSet<SubPitchReturn>()
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

        [Route("GetSubByPitchId")]
        [HttpGet]
        public IActionResult GetSpbyPitchId(int pitchId, string keyword)
        {
            try
            {
                var listSubPicth = _subPitchRepo.GetSubPitchByPitchId(pitchId, keyword);

                return Ok(_mapper.Map<IEnumerable<SubPitch>, IEnumerable<SubPitchReturn>>(listSubPicth));

            }

            catch (Exception ex)
            {

                return BadRequest();
            }

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
