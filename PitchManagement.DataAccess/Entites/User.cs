using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.DataAccess.Entites
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }
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
        [ForeignKey("GroupUserId")]
        public virtual GroupUser GroupUser { get; set; }
        public virtual ICollection<TeamUser> TeamUsers { get; set; }
        public virtual ICollection<OrderPitch>  OrderPitches { get; set; }
        

    }
}
