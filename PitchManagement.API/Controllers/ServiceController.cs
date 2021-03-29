using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Services;
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
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepo;
        private readonly IMapper _mapper;

        public ServiceController(IServiceRepository serviceRepo, IMapper mapper)
        {
            _serviceRepo = serviceRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllService(string keyword)
        {
            var listService = _serviceRepo.GetAllService(keyword);
            return Ok(_mapper.Map<IEnumerable<Service>>(listService));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllServiceById(int id)
        {
            var service = await _serviceRepo.GetServiceByIdAsync(id);
            if (service == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<Service>(service));
        }

        [HttpPost]
        public async Task<IActionResult> CreateService([FromBody] ServiceUI serviceAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var service = _mapper.Map<Service>(serviceAdd);
            var result = await _serviceRepo.CreateServiceAsync(service);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceUI serviceUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var service = _mapper.Map<Service>(serviceUpdate);
            var result = await _serviceRepo.UpdateServiceAsync(id, service);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _serviceRepo.DeleteServiceAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
