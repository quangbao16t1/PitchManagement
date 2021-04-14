using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Dtos.OrderServiceDetails;
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
    public class OrderServiceDetailController : ControllerBase
    {
        private readonly IOrderServiceDetailRepository _orderServiceRepo;
        private readonly IMapper _mapper;

        public OrderServiceDetailController(IOrderServiceDetailRepository orderServiceRepo, IMapper mapper)
        {
            _orderServiceRepo = orderServiceRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllOrderServiceDetail()
        {
            var listOrderService = _orderServiceRepo.GetAllOrderServiceDetails();
            return Ok(_mapper.Map<IEnumerable<OrderServiceDetailReturn>>(listOrderService));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllOrderServiceDetailById(int id)
        {
            var orderService = await _orderServiceRepo.GetOrderServiceDetailByIdAsnyc(id);
            if (orderService == null)
                return
                    BadRequest();

            return Ok(_mapper.Map<OrderServiceDetailReturn>(orderService));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderServiceDetail([FromBody] OrderServiceDetailUI orderServiceAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var orderService = _mapper.Map<OrderServiceDetail>(orderServiceAdd);
            var result = await _orderServiceRepo.CreateOrderServiceDetailAsync(orderService);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderServiceDetail(int id, [FromBody] OrderServiceDetailUI orderServiceEdit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var orderService = _mapper.Map<OrderServiceDetail>(orderServiceEdit);
            var result = await _orderServiceRepo.UpdateOrderServiceDetailAsync(id, orderService);
            if (result)
                return Ok();

            return BadRequest();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderServiceDetail(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _orderServiceRepo.DeleteOrderServiceDetailAsync(id);
            if (result)
                return Ok();

            return BadRequest();

        }
    }
}
