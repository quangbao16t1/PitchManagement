using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.Slides;
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
    public class SlideController : ControllerBase
    {
        private readonly ISlideRepository _slideRepo;
        private readonly IMapper _mapper;

        public SlideController(ISlideRepository slideRepo, IMapper mapper)
        {
            _slideRepo = slideRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllSlide()
        {
            var listSlide = _slideRepo.GetAllSlide();
            return Ok(_mapper.Map<IEnumerable<SlideReturn>>(listSlide));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllSlideById(int id)
        {
            var slide = await _slideRepo.GetSlideByIdAsync(id);
            if (slide == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<SlideReturn>(slide));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSlide([FromBody] SlideUI slideAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var slide = _mapper.Map<Slide>(slideAdd);
            var result = await _slideRepo.CreateSlideAsync(slide);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSlide(int id, [FromBody] SlideUI slideUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var slide = _mapper.Map<Slide>(slideUpdate);
            var result = await _slideRepo.UpdateSlideAsync(id, slide);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlide(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _slideRepo.DeleteSlideAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
