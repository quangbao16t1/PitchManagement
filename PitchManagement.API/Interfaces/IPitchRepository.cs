﻿using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
     public interface IPitchRepository
    {
        IEnumerable<Pitch> GetAllPitch(string keyword);
        Task<Pitch> GetPitchByIdAsync(int id);
        IEnumerable<Pitch> GetPitchByDistrict(int districtId);
        IEnumerable<Pitch> GetPitchByDistrictPage(int districtId, string keyword);
        IEnumerable<Pitch> GetPitchCreateBy(int userId);
        Task<bool> CreatePitchAsync(Pitch pitchCreate);
        Task<bool> UpdatePitchAsync(int id, Pitch pitchUpdate);
        Task<bool> DeletePitchAsync(int id);
        IEnumerable<int> GetIdPitch(int userId);
    }
}
