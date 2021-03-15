using AutoMapper;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.SubPitches;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Dtos.TeamUser;
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
            CreateMap<TeamForCreate, Team>();

            CreateMap<TeamUser, TeamUserReturn>().ForMember(x => x.TeamName, y => { y.MapFrom(z => z.Team.Name); })
                                                 .ForMember(x => x.CreateBy, y => { y.MapFrom(z => z.User.LastName); });
            CreateMap<TeamUserUI, TeamUser>();

            CreateMap<SubPitch, SubPitchReturn>().ForMember(x => x.PitchName, y => { y.MapFrom(z => z.Pitch.Name); });
            CreateMap<SubPitchUI, SubPitch>();
        }
    }
}
