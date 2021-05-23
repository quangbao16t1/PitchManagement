using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
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
        public IActionResult GetAllOrderPitchs(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listOrder = _orderPitchRepo.GetAllOrderPitch(keyword);

                int totalCount = listOrder.Count();

                var query = listOrder.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<OrderPitch>, IEnumerable<OrderPitchReturn>>(query);

                var paginationset = new PaginationSet<OrderPitchReturn>()
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

        [Route("GetOrderByPitchId")]
        [HttpGet]
        public IActionResult GetOrderPitchByPitchId(int pitchId, int status, int page = 1, int pagesize = 10)
        {
            try
            {
                var listOrder = _orderPitchRepo.GeOrderPitchByPitchId(pitchId,status);

                int totalCount = listOrder.Count();

                var query = listOrder.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<OrderPitch>, IEnumerable<OrderPitchReturn>>(query);

                var paginationset = new PaginationSet<OrderPitchReturn>()
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

        [Route("GetOrderByUserId")]
        [HttpGet]
        public IActionResult GetOrderPitchByUserId(int userId, int page = 1, int pagesize = 10)
        {
            try
            {
                var listOrder = _orderPitchRepo.GeOrderPitchByUserId(userId);

                int totalCount = listOrder.Count();

                var query = listOrder.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<OrderPitch>, IEnumerable<OrderPitchReturn>>(query);

                var paginationset = new PaginationSet<OrderPitchReturn>()
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

        [Route("GetOrderByDateOrder")]
        [HttpGet]
        public IActionResult GetOrderPitchByDateOrder(DateTime dateOrder, int userId, int page = 1, int pagesize = 10)
        {
            try
            {
                var listOrder = _orderPitchRepo.GetOrderPitchByDate(dateOrder, userId);

                int totalCount = listOrder.Count();

                var query = listOrder.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<OrderPitch>, IEnumerable<OrderPitchReturn>>(query);

                var paginationset = new PaginationSet<OrderPitchReturn>()
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

        [Route("GetByDatePitchId")]
        [HttpGet]
        public IActionResult GetByDatePitchId(DateTime dateOrder, int status, int pitchId, int page = 1, int pagesize = 10)
        {
            try
            {
                var listOrder = _orderPitchRepo.GetOrderByDatePitchId(dateOrder, status, pitchId);

                int totalCount = listOrder.Count();

                var query = listOrder.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<OrderPitch>, IEnumerable<OrderPitchReturn>>(query);

                var paginationset = new PaginationSet<OrderPitchReturn>()
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
