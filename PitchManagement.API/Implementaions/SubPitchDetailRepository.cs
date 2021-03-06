using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.Implementaions
{
    public class SubPitchDetailRepository : ISubPitchDetailRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SubPitchDetailRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateSubPitchDetailsync(SubPitchDetail subPitchDetail)
        {
            try
            {
                var result = _context.SubPitchDetails.Where(x => x.SubPitchId == subPitchDetail.SubPitchId).Select(x => x.StartTime);
                foreach(TimeSpan i in result)
                {
                    if (i == subPitchDetail.StartTime) return false;
                }    
                subPitchDetail.CreateTime = DateTime.Now;
                subPitchDetail.UpdateTime = null;
                _context.SubPitchDetails.Add(subPitchDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteSubPitchDetailAsync(int id)
        {
            var subPitchDetail = await _context.SubPitchDetails.FirstOrDefaultAsync(x => x.Id == id);

            if (subPitchDetail == null)
            {
                return false;
            }

            try
            {
                _context.SubPitchDetails.Remove(subPitchDetail);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubPitchDetail> GetAllSubPitchDetail(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                keyword = "";
            }

            return _context.SubPitchDetails.Include(x => x.SubPitch).AsEnumerable();
        }

        public async Task<SubPitchDetail> GetSubDetailByIdAsync(int id)
        {
            return await _context.SubPitchDetails.Include(x => x.SubPitch).FirstOrDefaultAsync(x => x.Id == id);
        }

        public IEnumerable<SubPitchDetail> GetSubDetailBySpId(int subPitchId)
        {
            return  _context.SubPitchDetails.Include(x => x.SubPitch).Where(x => x.SubPitchId == subPitchId).AsEnumerable();
        }

        public IEnumerable<SubPitchDetail> GetSubPitchDetailEmpty(DateTime dateOrder, int subPitchId)
        {
            //var productInBranch = _context.BranchProducts.Where(x => x.BrachId == branchId).Select(x => x.ProductId).ToList();
            //var productNotInBranch = _context.Products.Where(x => !productInBranch.Contains(x.Id));
            //return productNotInBranch.AsEnumerable();

            var listSpd = _context.OrderPitches.Where(x => x.DateOrder == dateOrder).Select(x => x.SubPitchDetailId).ToList();
            var listSpdEmpty = _context.SubPitchDetails.Include(x => x.SubPitch)
            .Where(x=> (x.SubPitchId == subPitchId) && (!listSpd.Contains(x.Id)));
            return listSpdEmpty.AsEnumerable();
        }

        public async Task<bool> UpdateSubPitchDetailAsync(int id, SubPitchDetail subPitchDetail)
        {
            var subPitchDt = await _context.SubPitchDetails.FirstOrDefaultAsync(p => p.Id == id);
            if (subPitchDt == null)
            {
                return false;
            }
            try
            {
                subPitchDt.Cost = subPitchDetail.Cost;
                //subPitchDt.SubPitchId = subPitchDetail.SubPitchId;
                //subPitchDt.StartTime = subPitchDetail.StartTime;
                //subPitchDt.EndTime = subPitchDetail.EndTime; 
                subPitchDt.UpdateTime = DateTime.Now;

                _context.SubPitchDetails.Update(subPitchDt);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
