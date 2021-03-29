using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Interfaces
{
    public interface IServiceDetailRepository
    {
        IEnumerable<ServiceDetail> GetAllServiceDetail(string keyword);
        Task<ServiceDetail> GetSeviceDetailByIdAsync(int id);
        Task<bool> CreateServiceDetailsync(ServiceDetail serviceDetail);
        Task<bool> UpdateServiceDetailAsync(int id, ServiceDetail serviceDetail);
        Task<bool> DeleteServiceDetailAsync(int id);
    }
}
