using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IDistrictRepository
    {
        IEnumerable<District> GetAllDistrict(string keyword);
        Task<District> GetDistrictByIdAsync(int id);
        Task<bool> CreateDistrictAsync(District district);
        Task<bool> UpdateDistrictAsync(int id, District district);
        Task<bool> DeleteDistrictAsync(int id);
    }
}
