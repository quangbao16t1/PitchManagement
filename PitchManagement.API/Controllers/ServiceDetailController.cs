using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.ServiceDetail;
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
    public class ServiceDetailController : ControllerBase
    {
        private readonly IServiceDetailRepository _serviceDetailRepo;
        private readonly IMapper _mapper;

        public ServiceDetailController(IServiceDetailRepository serviceDetailRepo, IMapper mapper)
        {
            _serviceDetailRepo = serviceDetailRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllServiceDetails(string keyword)
        {

            var list = _serviceDetailRepo.GetAllServiceDetail(keyword);

            return Ok(_mapper.Map<IEnumerable<ServiceDetailReturn>>(list));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllServiceDetailsById(int id)
        {
            var subDetail = await _serviceDetailRepo.GetSeviceDetailByIdAsync(id);
            if (subDetail == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ServiceDetailReturn>(subDetail));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubDetail([FromBody] ServiceDetailUI serviceDetailCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var serviceDetail = _mapper.Map<ServiceDetail>(serviceDetailCreate);

            var result = await _serviceDetailRepo.CreateServiceDetailsync(serviceDetail);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubPitch(int id, [FromBody] ServiceDetailUI serviceDetailUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var serviceDetail = _mapper.Map<ServiceDetail>(serviceDetailUpdate);

            var result = await _serviceDetailRepo.UpdateServiceDetailAsync(id, serviceDetail);
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
            var result = await _serviceDetailRepo.DeleteServiceDetailAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
