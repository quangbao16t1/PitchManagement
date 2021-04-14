using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.OrderPitches;
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
    public class OrderPitchController : ControllerBase
    {
        private readonly IOrderPitchRepository _orderPitchRepo;
        private readonly IMapper _mapper;

        public OrderPitchController(IOrderPitchRepository orderPitchRepo, IMapper mapper)
        {
            _orderPitchRepo = orderPitchRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllOrderPitchs(string keyword)
        {

            var listOrder = _orderPitchRepo.GetAllOrderPitch(keyword);

            return Ok(_mapper.Map<IEnumerable<OrderPitchReturn>>(listOrder));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderPitchById(int id)
        {
            var OrderPitch = await _orderPitchRepo.GetOrderPitchByIdAsync(id);
            if (OrderPitch == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<OrderPitchReturn>(OrderPitch));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderPitch([FromBody] OrderPitchUI orderPitchCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var order = _mapper.Map<OrderPitch>(orderPitchCreate);

            var result = await _orderPitchRepo.CreateOrderPitchAsync(order);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderPitch(int id, [FromBody] OrderPitchUI orderPitchUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = _mapper.Map<OrderPitch>(orderPitchUpdate);

            var result = await _orderPitchRepo.UpdateOrderPitchAsync(id, order);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderPitch(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _orderPitchRepo.DeleteOrderPitchAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }
    }
}
