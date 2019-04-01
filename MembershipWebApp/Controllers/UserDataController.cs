using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Interfaces;
using MembershipWebApp.Domain;
using AutoMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace MembershipWebApp.Controllers
{
    [Route("api/[controller]")]
    public class UserDataController : BaseApiController
    {
        //private readonly IConfigurationDataRequest _configrequest;
        private readonly UserManager<ApplicationUser> _usermanager;
        private readonly IMapper _objectmapper;
        private readonly SignInManager<ApplicationUser> _signinmanager;

        public UserDataController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signinmanager,
            IMapper objectmapper)
        {
            _usermanager = userManager;
            _signinmanager = signinmanager;
            _objectmapper = objectmapper;
        }

        #region RESTful Conventions
        /// <summary>
        /// GET: api/MemberData
        /// </summary>
        /// <returns>Nothing: this method will raise a NotFound HTTP exception, since we're not supporting this API call.</returns>
        [HttpGet()]
        public IActionResult Get()
        {
             //string token = HttpContext.Request.Headers.HeaderAuthorization
             UserDetailsViewModel cfg =
                new UserDetailsViewModel()
                {
                    InAdminRole = IsUserInAdminRole(),
                    InGuestRole = IsUserInGuestRole()
                };
            return new JsonResult(_objectmapper.Map<UserDetailsViewModel>(cfg), DefaultJsonSettings);
        }
        #endregion

        #region Common Methods
        /// <summary>
        /// Retrieves the .NET Core Identity User Id 
        /// for the current ClaimsPrincipal.
        /// </summary>
        /// <returns></returns>
        public async Task<string> GetCurrentUserId()
        {
            // if the user is not authenticated, throw an exception
            if (!User.Identity.IsAuthenticated)
                throw new NotSupportedException();

            //return User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var info = await _signinmanager.GetExternalLoginInfoAsync();
            if (info == null)
                // internal provider
                return User.FindFirst(ClaimTypes.NameIdentifier).Value;
            else
            {
                // external provider
                var user = await _usermanager.FindByLoginAsync(
                    info.LoginProvider,
                    info.ProviderKey);
                if (user == null) throw new NotSupportedException();
                return user.Id.ToString();
            }
        }


        public bool IsUserInGuestRole()
        {
            return IsUserInRole("Guest").GetAwaiter().GetResult();
        }

        public bool IsUserInAdminRole()
        {
            return IsUserInRole("Admin").GetAwaiter().GetResult();
        }

        public async Task<bool> IsUserInRole(string role)
        {            
            var rslt = false;
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                var userId = await GetCurrentUserId();
                var user = await _usermanager.FindByIdAsync(userId);
                if (user != null)
                {
                    rslt = await _usermanager.IsInRoleAsync(user, role);
                }
            }
            return rslt; //  new JsonResult(rslt);
        }
        #endregion Common Methods

        /// <summary>
        /// Returns a suitable JsonSerializerSettings object that can be used to generate the JsonResult return value for this Controller's methods.
        /// </summary>
        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }


    }
}
