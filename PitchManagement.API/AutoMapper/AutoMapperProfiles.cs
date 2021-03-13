using AutoMapper;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Dtos.Users;
using PitchManagement.DataAccess.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PitchManagement.API.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ForMember(x => x.GroupRole, y => { y.MapFrom(z => z.GroupUser.Name); });
            CreateMap<UserForCreateDto, User>();
            CreateMap<UserForUpdateDto, User>();

            CreateMap<Team, TeamUI>().ForMember(x => x.SubPitchName, y => { y.MapFrom(z => z.SubPitch.Name); });
            //CreateMap<TeamForUpdate, Team>();
            CreateMap<TeamForCreate, Team>();

        }
    }
}
