using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Dtos.Users
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool Activated { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool? Gender { get; set; }
        public DateTime? CreateDate { get; set; }
        public string ImageUrl { get; set; }
        public int GroupUserId { get; set; }
    }
}
