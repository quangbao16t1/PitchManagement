using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
using PitchManagement.API.Dtos.SubPitchDetail;
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
    public class SubPitchDetaiController : ControllerBase
    {
        private readonly ISubPitchDetailRepository _subDetailRepo;
        private readonly IMapper _mapper;

        public SubPitchDetaiController(ISubPitchDetailRepository subDetailRepo, IMapper mapper)
        {
            _subDetailRepo = subDetailRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllSubPitchDetails(string keyword)
        {

            var listSbDetail = _subDetailRepo.GetAllSubPitchDetail(keyword);

            return Ok(_mapper.Map<IEnumerable<SubPitchDetailReturn>>(listSbDetail));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllSubDetailsById(int id)
        {
            var subDetail = await _subDetailRepo.GetSubDetailByIdAsync(id);
            if (subDetail == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<SubPitchDetailReturn>(subDetail));
        }

        [Route("GetSubPitchDetailBySpId")]
        [HttpGet]
       public IActionResult GetAllSubDetailsBySpId(int subPitchId, int page = 1, int pagesize = 10)
        {
            try
            {
                var listPicth = _subDetailRepo.GetSubDetailBySpId(subPitchId);

                int totalCount = listPicth.Count();

                var query = listPicth.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<SubPitchDetailReturn>>(query);

                var paginationset = new PaginationSet<SubPitchDetailReturn>()
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

        [HttpPost]
        public async Task<IActionResult> CreateSubDetail([FromBody] SubPitchDetailUI subDetailCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var subDetail = _mapper.Map<SubPitchDetail>(subDetailCreate);

            var result = await _subDetailRepo.CreateSubPitchDetailsync(subDetail);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubPitch(int id, [FromBody] SubPitchDetailUI subDetailUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subDetail = _mapper.Map<SubPitchDetail>(subDetailUpdate);

            var result = await _subDetailRepo.UpdateSubPitchDetailAsync(id, subDetail);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DetelteSubDetail(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _subDetailRepo.DeleteSubPitchDetailAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
