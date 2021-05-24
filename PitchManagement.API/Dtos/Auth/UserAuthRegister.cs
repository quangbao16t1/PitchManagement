using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Auth
{
    public class UserAuthRegister
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public int GroupUserId { get; set; }
    }
}
