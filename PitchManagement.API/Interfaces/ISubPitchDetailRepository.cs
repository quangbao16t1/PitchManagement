using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface ISubPitchDetailRepository
    {
        IEnumerable<SubPitchDetail> GetAllSubPitchDetail(string keyword);
        Task<SubPitchDetail> GetSubDetailByIdAsync(int id);
        Task<bool> CreateSubPitchDetailsync(SubPitchDetail subPitchDetail);
        Task<bool> UpdateSubPitchDetailAsync(int id, SubPitchDetail subPitchDetail);
        Task<bool> DeleteSubPitchDetailAsync(int id);
    }
}
