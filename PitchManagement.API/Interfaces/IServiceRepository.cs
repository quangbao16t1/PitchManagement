using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IServiceRepository
    {
        IEnumerable<Service> GetAllService(string keyword);
        Task<Service> GetServiceByIdAsync(int id);
        Task<bool> CreateServiceAsync(Service service);
        Task<bool> UpdateServiceAsync(int id, Service service);
        Task<bool> DeleteServiceAsync(int id);
    }
}
