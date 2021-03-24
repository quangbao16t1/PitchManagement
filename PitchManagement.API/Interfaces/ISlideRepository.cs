using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface ISlideRepository
    {
        IEnumerable<Slide> GetAllSlide();
        Task<Slide> GetSlideByIdAsync(int id);
        Task<bool> CreateSlideAsync(Slide SlideForCreate);
        Task<bool> UpdateSlideAsync(int id, Slide SlideForUpdate);
        Task<bool> DeleteSlideAsync(int id);
    }
}
