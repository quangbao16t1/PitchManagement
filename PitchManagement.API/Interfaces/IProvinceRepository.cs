using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IProvinceRepository
    {
        IEnumerable<Province> GetAllProvince(string keyword);
        Task<Province> GetProvinceByIdAsync(int id);
        Task<bool> CreateProvinceAsync(Province province);
        Task<bool> UpdateProvinceAsync(int id, Province province);
        Task<bool> DeleteProvinceAsync(int id);
    }
}
