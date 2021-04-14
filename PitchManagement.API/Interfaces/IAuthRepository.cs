using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<User> LoginAdminPage(string username, string password);
        Task<bool> UserExists(string username);
        List<string> getRolesByUsername(string username);
    }
}
