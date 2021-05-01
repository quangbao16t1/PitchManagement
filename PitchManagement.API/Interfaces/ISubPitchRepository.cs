using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface ISubPitchRepository
    {
        IEnumerable<SubPitch> GetAllSubPitch(string keyword);
        IEnumerable<SubPitch> GetSubPitchByPitchId(int pitchId, string keyword);
        Task<SubPitch> GetSubPitchByIdAsync(int id);
        Task<bool> CreateSubPitchAsync(SubPitch SubPitchCreate);
        Task<bool> UpdateSubPitchAsync(int id, SubPitch subPitchUpdate);
        Task<bool> DeleteSubPitchAsync(int id);
    }
}
