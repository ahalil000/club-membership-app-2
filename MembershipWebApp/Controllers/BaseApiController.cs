using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using MembershipWebApp.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MembershipWebApp.Domain;
using MembershipWebApp.Classes;
using Microsoft.AspNetCore.Http;

namespace MembershipWebApp.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        UserInfoViewModel _userInfo = null;

        #region Constructor
        public BaseApiController(
            //UserManager<ApplicationUser> userManager,
            //SignInManager<ApplicationUser> signinmanager,
            //IConfiguration configuration
            )
        {
            _userInfo = new UserInfoViewModel();
            //string requestToken = this.Request.Headers.HeaderAuthorization
            //TokenManager.ValidateToken("");
               

            // Instantiate the required classes through DI
            //DbContext = context;
            //RoleManager = roleManager;
            //UserManager = userManager;
            //Configuration = configuration;

            // Instantiate a single JsonSerializerSettings object
            // that can be reused multiple times.
            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };

        }
        #endregion

        #region Shared Properties
        //protected ApplicationDbContext DbContext { get; private set; }
        protected RoleManager<IdentityRole> RoleManager { get; private set; }
        protected UserManager<ApplicationUser> UserManager { get; private set; }
        protected IConfiguration Configuration { get; private set; }
        protected JsonSerializerSettings JsonSettings { get; private set; }
        #endregion
    }
}
