using PitchManagement.API.Dtos.Users;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers(string keyword);
        Task<User> GetUserByIdAsync(int id);
        Task<bool> CreateUserAsync(UserForCreateDto userCreate);
        Task<bool> EditUserAsync(int id, UserForUpdateDto userUpdate);
        Task<bool> DeleteUserAsync(int id);
        Task<bool> UserExists(string username);
    }
}
