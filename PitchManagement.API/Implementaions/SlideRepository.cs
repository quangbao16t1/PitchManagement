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
    public class SlideRepository : ISlideRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SlideRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> CreateSlideAsync(Slide slideForCreate)
        {
            try
            {
                _context.Slides.Add(slideForCreate);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteSlideAsync(int id)
        {
            var slideIndb = await _context.Slides.FirstOrDefaultAsync(x => x.Id == id);

            if (slideIndb == null)
            {
                return false;
            }

            try
            {
                _context.Slides.Remove(slideIndb);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Slide> GetAllSlide()
        {
            return _context.Slides.Include(x => x.Pitch).ToList();
        }

        public async Task<Slide> GetSlideByIdAsync(int id)
        {
            return await _context.Slides.Include(x => x.Pitch).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateSlideAsync(int id, Slide slideUpdate)
        {
            var slideInDb = await _context.Slides.FirstOrDefaultAsync(x => x.Id == id);
            if (slideInDb == null)
                return false;
            try
            {
                slideInDb.PitchId = slideUpdate.PitchId;
                slideInDb.Status = slideUpdate.Status;
                slideInDb.ImageUrl = slideUpdate.ImageUrl;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
