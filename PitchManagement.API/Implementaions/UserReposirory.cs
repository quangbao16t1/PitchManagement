using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PitchManagement.API.Dtos.Users;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PitchManagement.API.Implementaions
{
    public class UserReposirory : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserReposirory(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateUserAsync(UserForCreateDto userCreate)
        {
            var user = _mapper.Map<User>(userCreate);
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(userCreate.Password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                throw;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var userDelete = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if(userDelete == null)
            {
                return false;
            }
            try
            {
                _context.Users.Remove(userDelete);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<bool> EditUserAsync(int id, UserForUpdateDto userUpdate)
        {
            var userInDb = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if(userInDb == null)
            {
                return false;
            }
            try
            {
                userInDb.Address = userUpdate.Address;
                userInDb.Email = userUpdate.Email;
                userInDb.FirstName = userUpdate.FirstName;
                userInDb.LastName = userUpdate.LastName;
                userInDb.PhoneNumber = userUpdate.PhoneNumber;
                userInDb.Gender = userUpdate.Gender;
                userInDb.GroupUserId = userUpdate.GroupUserId;
                userInDb.ImageUrl = userUpdate.ImageUrl;

                _context.Users.Update(userInDb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception)
            {
                throw;
            }
        }

        public IEnumerable<User> GetAllUsers(string keyword)
        {
            if(string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }
            return _context.Users.Include(x => x.GroupUser)
                .Where(p => p.LastName.ToLower().Contains(keyword.ToLower())).AsEnumerable();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.Include(x => x.GroupUser).FirstOrDefaultAsync(p => p.Id == id);   
        }

        public async Task<bool> UserExists(string username)
        {
            var userInDb = await _context.Users.FirstOrDefaultAsync(p => p.Username == username);
            return userInDb != null;
        }

        public IEnumerable<User> GetUserByGroupId()
        {
            //var productInBranch = _context.BranchProducts.Where(x => x.BrachId == branchId).Select(x => x.ProductId).ToList();
            //var productNotInBranch = _context.Products.Where(x => !productInBranch.Contains(x.Id));
            //return productNotInBranch.AsEnumerable();
            var userInTeam = _context.TeamUsers.Select(x => x.UserId).ToList();

            var userNotTeam = _context.Users.Include(x => x.GroupUser).Include(x => x.TeamUsers)
                .Where(x => (x.GroupUserId == 3) && (!userInTeam.Contains(x.Id)));
            return userNotTeam.AsEnumerable();
        }
    }
}
