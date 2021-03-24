using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PitchManagement.API.AutoMapper;
using PitchManagement.API.Implementaions;
using PitchManagement.API.Interfaces;
using PitchManagement.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
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

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
