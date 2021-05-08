using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Core;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.Users;
using PitchManagement.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllUsers(string keyword, int page = 1, int pagesize = 10)
        {
            try
            {
                var listUsers = _userRepo.GetAllUsers(keyword);

                int totalCount = listUsers.Count();

                var query = listUsers.OrderByDescending(x => x.Id).Skip((page - 1) * pagesize).Take(pagesize);

                var response = _mapper.Map<IEnumerable<UserDto>>(query);

                var paginationset = new PaginationSet<UserDto>()
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
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userRepo.GetUserByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserForCreateDto userForCreate)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(await _userRepo.UserExists(userForCreate.Username))
                return BadRequest("The Users has been exited");

            var result = await _userRepo.CreateUserAsync(userForCreate);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdate)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userRepo.EditUserAsync(id, userForUpdate);
            if (result)
                return Ok();

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userRepo.DeleteUserAsync(id);
            if (result)
                return Ok();

            return BadRequest();
        }

    }
}
