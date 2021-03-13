using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PitchManagement.API.Interfaces;
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

        public ProvinceController(IProvinceRepository provinceRepo)
        {
            _provinceRepo = provinceRepo;
        }
        [HttpGet]
        public IActionResult GetAllProvince(string keyword)
        {

            var listUsers = _provinceRepo.GetAllProvince(keyword);

            return Ok(listUsers);
        }
    }
}
