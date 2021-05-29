using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PitchManagement.API.AutoMapper;
using PitchManagement.API.Implementaions;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PitchManagement.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(options =>
               options.UseSqlServer(
                   Configuration.GetConnectionString("DefaultConnection"), x => x.MigrationsAssembly("PitchManagement.DataAccess")));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PitchManagement.API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
               
            });
            services.AddAutoMapper(typeof(AutoMapperProfiles), typeof(AutoMapperProfiles));
            //Repository

            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IUserRepository, UserReposirory>();
            services.AddScoped<IProvinceRepository, ProvinceRepository>();
            services.AddScoped<ITeamUserRepository, TeamUserRepository>();
            services.AddScoped<ISubPitchRepository, SubPitchRepository>();
            services.AddScoped<IPitchRepository, PitchRepository>();
            services.AddScoped<ISlideRepository, SlideRepository>();
            services.AddScoped<IMatchRepository, MatchRepository>();
            services.AddScoped<ISubPitchDetailRepository, SubPitchDetailRepository>();
            services.AddScoped<IDistrictRepository, DistrictRepository>();
            services.AddScoped<IWardRepository, WardRepository>();
            services.AddScoped<IWardRepository, WardRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<IServiceDetailRepository, ServiceDetailRepository>();
            services.AddScoped<IOrderPitchRepository, OrderPitchRepository>();
            //services.AddScoped<IOrderServiceDetailRepository, OrderServiceDetailRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();


           
            //services.AddAuthorization();

            services.AddMvc(ops => {
                ops.EnableEndpointRouting = false;

            });


            //services.AddCors(options =>
            //{
            //    options.AddPolicy("corspolicy",
            //        builder => builder.AllowAnyOrigin()
            //        .AllowAnyMethod()
            //        .AllowAnyHeader());
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PitchManagement.API v1"));
            }
            //app.UseCors("CorsPolicy");
            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseMvc();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
