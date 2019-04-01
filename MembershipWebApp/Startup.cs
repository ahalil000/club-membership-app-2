using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using MembershipWebApp.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MembershipWebApp.Interfaces;
using MembershipWebApp.Services;
using AutoMapper;
using MembershipWebApp.Mapping;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MembershipWebApp.Classes;

namespace MembershipWebApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("configuration.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddEntityFrameworkSqlServer();

            // This for the user identity management:
            // Add Identity Services & Stores
            services.AddIdentity<ApplicationUser, ApplicationRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequireNonAlphanumeric = false;
            }).
            AddEntityFrameworkStores<MembershipContext>().
            AddDefaultTokenProviders();

            // Dependency injection scoping.
            services.AddScoped<IConfigurationDataRequest, ConfigurationDataRequest>();
            services.AddScoped<IPasswordHashService, PasswordHashService>();
            services.AddScoped<IMembershipDataRequest, MembershipDataRequest>();
            services.AddScoped<IMembershipDetailDataRequest, MembershipDetailDataRequest>();
            services.AddScoped<IMembershipAddressDataRequest, MembershipAddressDataRequest>();
            services.AddScoped<IRoleManagerService, RoleManagerService>();

            //services.AddIdentity<ApplicationUser, ApplicationRole>()
            //        .AddDefaultTokenProviders();

            //// Identity Services
            //services.AddTransient<IUserStore<ApplicationUser>, CustomUserStore>();
            //services.AddTransient<IRoleStore<ApplicationRole>, CustomRoleStore>();
            //string connectionString = Configuration.GetConnectionString("DefaultConnection");
            //services.AddTransient<SqlConnection>(e => new SqlConnection(connectionString));
            //services.AddTransient<DapperUsersTable>();


            // Obtain configuration settings
            var connection = Configuration.GetConnectionString("connstr");
            services.AddDbContext<MembershipContext>
                (options => options.UseSqlServer(connection));

            // Automapper bootstrapping.
            services.AddAutoMapper(a => a.AddProfile(new CustomMapping()));

            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});

            // Add the Jwt Bearer Header Authentication to validate Tokens
            services.AddAuthentication(                
                JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.SaveToken = true; // 10/1/2019

                //options.AutomaticAuthenticate = true,
                //options.AutomaticChallenge = true,
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = JwtProvider.SecurityKey,
                    ValidateIssuerSigningKey = false,
                    ValidIssuer = JwtProvider.Issuer,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            loggerFactory.AddEventSourceLogger();

            // Configure a rewrite rule to auto-lookup for standard default files such as index.html.
            app.UseDefaultFiles();

            // Serve static files (html, css, js, images & more). See also the following URL:
            // https://docs.asp.net/en/latest/fundamentals/static-files.html for further reference.
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    // Disable caching for all static files.
                    context.Context.Response.Headers["Cache-Control"] = Configuration["StaticFiles:Headers:Cache-Control"];
                    context.Context.Response.Headers["Pragma"] = Configuration["StaticFiles:Headers:Pragma"];
                    context.Context.Response.Headers["Expires"] = Configuration["StaticFiles:Headers:Expires"];
                }
            });

            // Add MVC to the pipeline
            //app.UseStaticFiles();

            app.UseAuthentication(); // 10/1/2019

            // Add a custom Jwt Provider to generate Tokens
            app.UseJwtProvider();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            // Get current environment DEV, TEST, PROD
            IConfigurationSection configurationSection = Configuration.GetSection("CurrentEnvironment");
            string devenv = configurationSection.GetValue<string>("environment");

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<MembershipContext>();
                //context.Database.EnsureDeleted(); // recreate DB -- for demo we comment out/remove this line.
                context.Database.EnsureCreated(); // create database if not already created.

                //var idcontext = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

                var rolecontext = serviceScope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

                if (devenv == "DEV")
                {
                    Initialize(context, userManager, rolecontext); //, idcontext);
                }
            }
        }

        public async static void Initialize(MembershipContext context, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<ApplicationRole> roleManager)
            //UserManager<ApplicationUser> userManager)
        {
            // Do any initialization code here for the DB. 
            // Can include populate lookups, data based configurations etc.
            //SeedData seed_data;
            PasswordHashService p_hasher = new PasswordHashService();
            SeedData seed_data = new SeedData(context, p_hasher, userManager, roleManager); //, roleManager, userManager);

            // Get counts if users.
            Task<int> numUsersResult = SumUsers(context);
            int numUsers = await SumUsers(context);

            // Get counts of data. Do this asynchronously. 
            Task<int> numMembersResult = SumMembers(context);
            int numMembers = await SumMembers(context);

            Task<int> numMemberDetailsResult = SumMemberDetails(context);
            int numMemberDetails = await SumMemberDetails(context);

            Task<int> numMemberAddressResult = SumMemberAddresses(context);
            int numMemberAddresses = await SumMemberAddresses(context);

            // Full rebuild user authentication data - If no User data then regenerate User/Role records.
            if (numUsers == 0)
            {
                // Create initial users and roles.
                //seed_data.CreateUsersAsync();
                seed_data.CreateUsers();
            }

            // Full rebuild data - If no Member data then regenerate Member base table and all child tables.
            if (numMembers == 0)
            {
                // Add 50 random members to database.
                seed_data.GenerateMembers(50);
            }

            // If Member base table exists and child tables don't then generate those.
            if ((numMembers > 0) && (numMemberDetails == 0))
            {
                seed_data.GenerateMemberDetails();
            }

            // If Member base table exists and child tables don't then generate those.
            if ((numMembers > 0) && (numMemberAddresses == 0))
            {
                seed_data.GenerateMemberAddresses();
            }
        }

        static async Task<int> SumMemberAddresses(MembershipContext context)
        {
            return context.MemberAddresses.Count();
        }

        static async Task<int> SumMemberDetails(MembershipContext context)
        {
            return context.MemberDetails.Count();
        }

        static async Task<int> SumMembers(MembershipContext context)
        {
            return context.Members.Count();
        }

        static async Task<int> SumUsers(MembershipContext context)
        {
            return context.Users.Count();
        }
    }
}
