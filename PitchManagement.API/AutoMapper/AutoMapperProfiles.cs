using AutoMapper;
using PitchManagement.API.Dtos;
using PitchManagement.API.Dtos.Auth;
using PitchManagement.API.Dtos.Districts;
using PitchManagement.API.Dtos.Matches;
using PitchManagement.API.Dtos.OrderPitches;
using PitchManagement.API.Dtos.OrderServiceDetails;
using PitchManagement.API.Dtos.Pitches;
using PitchManagement.API.Dtos.Provinces;
using PitchManagement.API.Dtos.ServiceDetail;
using PitchManagement.API.Dtos.Services;
using PitchManagement.API.Dtos.Slides;
using PitchManagement.API.Dtos.SubPitchDetail;
using PitchManagement.API.Dtos.SubPitches;
using PitchManagement.API.Dtos.Teams;
using PitchManagement.API.Dtos.TeamUser;
using PitchManagement.API.Dtos.Users;
using PitchManagement.API.Dtos.Wards;
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
            CreateMap<User, UserAuthReturn>()
               .ForMember(x => x.GroupRole, y => { y.MapFrom(z => z.GroupUser.Name); });

            CreateMap<User, UserDto>().ForMember(x => x.GroupRole, y => { y.MapFrom(z => z.GroupUser.Name); });
            CreateMap<UserForCreateDto, User>();
            CreateMap<UserForUpdateDto, User>();

            CreateMap<Team, TeamUI>();
            CreateMap<TeamReturn, Team>();
            CreateMap<TeamForCreate, Team>();

            CreateMap<TeamUser, TeamUserReturn>().ForMember(x => x.TeamName, y => { y.MapFrom(z => z.Team.Name); })
                                                 .ForMember(x => x.CreateBy, y => { y.MapFrom(z => z.Team.CreateBy); })
                                                 .ForMember(x => x.TeamId, y => { y.MapFrom(z => z.Team.Id); })
                                                 .ForMember(x => x.Level, y => { y.MapFrom(z => z.Team.Level); })
                                                 .ForMember(x => x.Logo, y => { y.MapFrom(z => z.Team.Logo); })
                                                 .ForMember(x => x.AgeFrom, y => { y.MapFrom(z => z.Team.AgeFrom); })
                                                 .ForMember(x => x.AgeTo, y => { y.MapFrom(z => z.Team.AgeTo); })
                                                 .ForMember(x => x.DateOfWeek, y => { y.MapFrom(z => z.Team.DateOfWeek); })
                                                 .ForMember(x => x.StartTime, y => { y.MapFrom(z => z.Team.StartTime); });
            CreateMap<TeamUserUI, TeamUser>();
            CreateMap<AllTeamUser, TeamUser>();

            CreateMap<TeamUser, TeamUserMember>().ForMember(x => x.TeamName, y => { y.MapFrom(z => z.Team.Name); })
                                                 .ForMember(x => x.UserName, y => { y.MapFrom(z => z.User.Username); })
                                                 .ForMember(x => x.FirstName, y => { y.MapFrom(z => z.User.FirstName); })
                                                 .ForMember(x => x.PhoneNumber, y => { y.MapFrom(z => z.User.PhoneNumber); })
                                                 .ForMember(x => x.UserId, y => { y.MapFrom(z => z.User.Id); })
                                                 .ForMember(x => x.LastName, y => { y.MapFrom(z => z.User.LastName); });

            CreateMap<SubPitch, SubPitchReturn>().ForMember(x => x.PitchName, y => { y.MapFrom(z => z.Pitch.Name); })
                                                 .ForMember(x => x.PitchId, y => { y.MapFrom(z => z.Pitch.Id); });
            CreateMap<SubPitchUI, SubPitch>();

            CreateMap<Pitch, PitchReturn>().ForMember(x => x.DistrictName, y => { y.MapFrom(z => z.District.Name); });
            CreateMap<PitchUI, Pitch>();

            CreateMap<Slide, SlideReturn>().ForMember(x => x.PitchName, y => { y.MapFrom(z => z.Pitch.Name); });
            CreateMap<SlideUI, Slide>();

            CreateMap<Match, MatchReturn>().ForMember(x => x.TeamName, y => { y.MapFrom(z => z.Team.Name); })
                                            .ForMember(x => x.PitchName, y => { y.MapFrom(z => z.Pitch.Name); })
                                            .ForMember(x => x.DistrictName, y => { y.MapFrom(z => z.Pitch.District.Name); });

            CreateMap<MatchUI, Match>();

            CreateMap<MatchByStatus, Match>();

            CreateMap<SubPitchDetail, SubPitchDetailReturn>().ForMember(x => x.SubPitchName, y => { y.MapFrom(z => z.SubPitch.Name); })
                .ForMember(x => x.StartTime, y => y.MapFrom( z => new DateTime().Add(z.StartTime).ToString("HH:mm")))
                .ForMember(x => x.EndTime, y => y.MapFrom( z => new DateTime().Add(z.EndTime).ToString("HH:mm")));

            CreateMap<SubPitchDetailUI, SubPitchDetail>().ForMember(x => x.StartTime, y => y.MapFrom(z => TimeSpan.Parse(z.StartTime)))
                                                         .ForMember(x => x.EndTime, y => y.MapFrom(z => TimeSpan.Parse(z.EndTime)));

            CreateMap<ProvinceUI, Province>();
            CreateMap<Province, ProvinceUI>();

            CreateMap<District, DistrictReturn>().ForMember(x => x.ProvinceName, y => { y.MapFrom(z => z.Province.Name); });
            CreateMap<DistrictUI, District>();

            CreateMap<Ward, WardReturn>().ForMember(x => x.DistrictName, y => { y.MapFrom(z => z.District.Name); });
            CreateMap<WardUI, Ward>();

            CreateMap<ServiceUI, Service>();

            CreateMap<ServiceDetail, ServiceDetailReturn>().ForMember(x => x.SubPitchName, y => { y.MapFrom(z => z.SubPitch.Name); })
                            .ForMember(x => x.ServiceName, y => { y.MapFrom(z => z.Service.Name); })
                            .ForMember(x => x.StartTime, y => y.MapFrom(z => new DateTime().Add(z.StartTime).ToString("HH:mm")))
                            .ForMember(x => x.EndTime, y => y.MapFrom(z => new DateTime().Add(z.EndTime).ToString("HH:mm")));
            CreateMap<ServiceDetailUI, ServiceDetail>().ForMember(x => x.StartTime, y => y.MapFrom(z => TimeSpan.Parse(z.StartTime)))
                                                         .ForMember(x => x.EndTime, y => y.MapFrom(z => TimeSpan.Parse(z.EndTime)));

            CreateMap<OrderPitch, OrderPitchReturn>().ForMember(x => x.UserName, y => { y.MapFrom(z => z.User.Username); })
                                            .ForMember(x => x.SubPitchName, y => { y.MapFrom(z => z.SubPitchDetail.SubPitch.Name); })
                                            .ForMember(x => x.Cost, y => { y.MapFrom(z => z.SubPitchDetail.Cost); })
                                            .ForMember(x => x.LastName, y => { y.MapFrom(z => z.User.LastName); })
                                            .ForMember(x => x.FirstName, y => { y.MapFrom(z => z.User.FirstName); })
                                            .ForMember(x => x.PitchName, y => { y.MapFrom(z => z.SubPitchDetail.SubPitch.Pitch.Name); })
                               .ForMember(x => x.DateOrder, y => y.MapFrom(z => z.DateOrder.ToString("MM/dd/yyyy")))
                               .ForMember(x => x.StartTime, y => y.MapFrom(z => new DateTime().Add(z.SubPitchDetail.StartTime).ToString("HH:mm")))
                            .ForMember(x => x.EndTime, y => y.MapFrom(z => new DateTime().Add(z.SubPitchDetail.EndTime).ToString("HH:mm")));
            CreateMap<OrderPitchUI, OrderPitch>();

            CreateMap<OrderServiceDetail, OrderServiceDetailReturn>().ForMember(x => x.UserName, y => { y.MapFrom(z => z.OrderPitch.User.LastName); })
                                            .ForMember(x => x.SubPitchName, y => { y.MapFrom(z => z.ServiceDetail.SubPitch.Name); })
                                            .ForMember(x => x.ServiceName, y => { y.MapFrom(z => z.ServiceDetail.Service.Name); })
                                            .ForMember(x => x.ServiceCost, y => { y.MapFrom(z => z.ServiceDetail.Cost); })
                                            .ForMember(x => x.OrderCost, y => { y.MapFrom(z => z.OrderPitch.SubPitchDetail.Cost); })
                                            .ForMember(x => x.PhoneOrder, y => { y.MapFrom(z => z.OrderPitch.PhoneOrder); })
                                            .ForMember(x => x.StartTime, y => { y.MapFrom(z => z.ServiceDetail.StartTime); })
                                            .ForMember(x => x.EndTime, y => { y.MapFrom(z => z.ServiceDetail.EndTime); });
            CreateMap<OrderServiceDetailUI, OrderServiceDetail>();

        }
    }
}
