using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
     public interface IWardRepository
    {
        IEnumerable<Ward> GetAllWard(string keyword);
        IEnumerable<Ward> GetAllWardByDistrict(int district);
        Task<Ward> GetWardByIdAsync(int id);
        Task<bool> CreateWardAsync(Ward wardCreare);
        Task<bool> UpdateWardAsync(int id, Ward wardUpdate);
        Task<bool> DeleteWardAsync(int id);
    }
}
