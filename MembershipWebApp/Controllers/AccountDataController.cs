using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Interfaces;
using MembershipWebApp.Domain;
using MembershipWebApp.Services;
using AutoMapper;
using Newtonsoft.Json;

//using System.Security.Claims;
//using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Web;

namespace MembershipWebApp.Controllers
{
    [Route("api/[controller]")]
    public class AccountDataController : Controller
    {

        //private readonly IAccountDataRequest _accountdatarequest;
        private readonly IMapper _objectmapper;
        private readonly SignInManager<ApplicationUser> _signinmanager;
        private readonly UserManager<ApplicationUser> _usermanager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly MembershipContext _membershipContext;

        public AccountDataController(
            MembershipContext membershipContext,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            //IAccountDataRequest accountdatarequest,
            IMapper objectmapper)
        {
            _membershipContext = membershipContext;
            _signinmanager = signInManager;
            _usermanager = userManager;
            _roleManager = roleManager;
            //_accountdatarequest = accountdatarequest;
            _objectmapper = objectmapper;
        }

        //[Route("IsUserInAdminRole")]
        //public async Task<IActionResult> IsUserInAdminRole()
        //{
        //    return new JsonResult(await IsUserInRole("Admin"));
        //}

        [Route("IsUserInAdminRole")]
        public IActionResult IsUserInAdminRole()
        {
            return new JsonResult(false);
            //return new JsonResult(IsUserInRole("Admin"));
        }


        [Route("IsUserInGuestRole")]
        public IActionResult IsUserInGuestRole()
        {
            return new JsonResult(IsUserInRole("Guest"));
        }

        public async Task<IActionResult> IsUserInRole(string role)
        {
            var rslt = false;
            //if (HttpContext.User.Identity.IsAuthenticated)
            //{
            var userId = await GetCurrentUserId();
            var user = await _usermanager.FindByIdAsync(userId);
            if (user != null)
            {
                rslt = await _usermanager.IsInRoleAsync(user, role);
            }
            //}
            return new JsonResult(rslt);
        }

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
        #endregion Common Methods

        #region Common Properties
        /// <summary>
        /// Returns a suitable JsonSerializerSettings object 
        /// that can be used to generate the JsonResult return value 
        /// for this Controller's methods.
        /// </summary>
        protected JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }
        #endregion Common Properties

        #region RESTful Conventions
        /// <summary>
        /// GET: api/accounts
        /// </summary>
        /// <returns>A Json-serialized object representing the current account.</returns>
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var id = await GetCurrentUserId();
            var user = _membershipContext.Users.Where(i => i.Id.ToString() == id).FirstOrDefault();
            if (user != null) return new JsonResult(new UserViewModel()
            {
                UserName = user.UserName,
                Email = user.Email,
                DisplayName = user.DisplayName
            }, DefaultJsonSettings);
            else return NotFound(new { error = String.Format("User ID {0} has not been found", id) });
        }

        /// <summary>
        /// GET: api/accounts/{id}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>A Json-serialized object representing a single account.</returns>
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return BadRequest(new { error = "not implemented (yet)." });
        }

        /// <summary>
        /// POST: api/accounts
        /// </summary>
        /// <returns>Creates a new User and return it accordingly.</returns>
        [HttpPost()]
        public async Task<IActionResult> Add([FromBody]UserViewModel uvm)
        {
            if (uvm != null)
            {
                try
                {
                    // check if the Username/Email already exists
                    ApplicationUser user = await _usermanager.FindByNameAsync(uvm.UserName);
                    if (user != null) throw new Exception("UserName already exists.");
                    user = await _usermanager.FindByEmailAsync(uvm.Email);
                    if (user != null) throw new Exception("E-Mail already exists.");

                    var now = DateTime.Now;

                    // create a new Item with the client-sent json data
                    user = new ApplicationUser()
                    {
                        UserName = uvm.UserName,
                        Email = uvm.Email,
                        DisplayName = uvm.DisplayName,
                        CreatedDate = now,
                        LastModifiedDate = now
                    };

                    // Add the user to the Db with a random password
                    await _usermanager.CreateAsync(user, uvm.Password);

                    // persist the changes into the Database.
                    _membershipContext.SaveChanges();

                    // Assign the user to the 'Registered' role.
                    await _usermanager.AddToRoleAsync(user, "Registered");

                    // Remove Lockout and E-Mail confirmation
                    user.EmailConfirmed = true;
                    user.LockoutEnabled = false;

                    // persist the changes into the Database.
                    _membershipContext.SaveChanges();

                    // return the newly-created User to the client.
                    return new JsonResult(new UserViewModel()
                    {
                        UserName = user.UserName,
                        Email = user.Email,
                        DisplayName = user.DisplayName
                    });
                }
                catch (Exception e)
                {
                    // return the error.
                    return new JsonResult(new { error = e.Message });
                }
            }

            // return a generic HTTP Status 500 (Not Found) if the client payload is invalid.
            return new StatusCodeResult(500);
        }

        /// <summary>
        /// PUT: api/accounts/{id}
        /// </summary>
        /// <returns>Updates current User and return it accordingly.</returns>
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody]UserViewModel uvm)
        {
            if (uvm != null)
            {
                try
                {
                    // retrieve user
                    var id = await GetCurrentUserId();
                    ApplicationUser user = await _usermanager.FindByIdAsync(id);
                    if (user == null) throw new Exception("User not found");

                    // check for current password
                    if (await _usermanager.CheckPasswordAsync(user, uvm.Password))
                    {
                        // current password ok, perform changes (if any)
                        bool hadChanges = false;

                        if (user.Email != uvm.Email)
                        {
                            // check if the Email already exists
                            ApplicationUser user2 = await _usermanager.FindByEmailAsync(uvm.Email);
                            if (user2 != null && user.Id != user2.Id) throw new Exception("E-Mail already exists.");
                            else await _usermanager.SetEmailAsync(user, uvm.Email);
                            hadChanges = true;
                        }

                        if (!string.IsNullOrEmpty(uvm.PasswordNew))
                        {
                            await _usermanager.ChangePasswordAsync(user, uvm.Password, uvm.PasswordNew);
                            hadChanges = true;
                        }

                        if (user.DisplayName != uvm.DisplayName)
                        {
                            user.DisplayName = uvm.DisplayName;
                            hadChanges = true;
                        }

                        if (hadChanges)
                        {
                            // if we had at least 1 change:
                            // update LastModifiedDate
                            user.LastModifiedDate = DateTime.Now;
                            // persist the changes into the Database.
                            _membershipContext.SaveChanges();
                        }

                        // return the updated User to the client.
                        return new JsonResult(new UserViewModel()
                        {
                            UserName = user.UserName,
                            Email = user.Email,
                            DisplayName = user.DisplayName
                        }, DefaultJsonSettings);
                    }
                    else throw new Exception("Old password mismatch");
                }
                catch (Exception e)
                {
                    // return the error.
                    return new JsonResult(new { error = e.Message });
                }
            }

            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            return NotFound(new { error = String.Format("Current User has not been found") });
        }

        /// <summary>
        /// DELETE: api/accounts/
        /// </summary>
        /// <returns>Deletes current User, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete()]
        [Authorize]
        public IActionResult Delete()
        {
            return BadRequest(new { error = "not implemented (yet)." });
        }

        /// <summary>
        /// DELETE: api/accounts/{id}
        /// </summary>
        /// <returns>Deletes an User, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            return BadRequest(new { error = "not implemented (yet)." });
        }
        #endregion RESTful Conventions

        #region External Authentication Providers
        // GET: /api/Accounts/ExternalLogin
        [HttpGet("ExternalLogin/{provider}")]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            switch (provider.ToLower())
            {
                case "facebook":
                case "google":
                case "twitter":
                    // Request a redirect to the external login provider.
                    var redirectUrl = Url.Action("ExternalLoginCallback", "Accounts", new { ReturnUrl = returnUrl });
                    var properties = _signinmanager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
                    return Challenge(properties, provider);
                default:
                    return BadRequest(new { Error = String.Format("Provider '{0}' is not supported.", provider) });
            }
        }

        [HttpGet("ExternalLoginCallBack")]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            try
            {
                // Check if the External Provider returned an error and act accordingly
                if (remoteError != null)
                {
                    throw new Exception(remoteError);
                }

                // Extract the login info obtained from the External Provider

                ExternalLoginInfo info = await _signinmanager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    // if there's none, emit an error
                    throw new Exception("ERROR: No login info available.");
                }

                // Check if this user already registered himself with this external provider before
                var user = await _usermanager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
                if (user == null)
                {
                    // If we reach this point, it means that this user never tried to logged in
                    // using this external provider. However, it could have used other providers 
                    // and /or have a local account. 
                    // We can find out if that's the case by looking for his e-mail address.

                    // Retrieve the 'emailaddress' claim
                    var emailKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
                    var email = info.Principal.FindFirst(emailKey).Value;

                    // Lookup if there's an username with this e-mail address in the Db
                    user = await _usermanager.FindByEmailAsync(email);
                    if (user == null)
                    {
                        // No user has been found: register a new user using the info retrieved from the provider
                        DateTime now = DateTime.Now;

                        // Create a unique username using the 'nameidentifier' claim
                        var idKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
                        var username = String.Format("{0}{1}", info.LoginProvider, info.Principal.FindFirst(idKey).Value);

                        user = new ApplicationUser()
                        {
                            UserName = username,
                            Email = email,
                            CreatedDate = now,
                            LastModifiedDate = now
                        };

                        // Add the user to the Db with a random password
                        await _usermanager.CreateAsync(user, "Pass4External");

                        // Assign the user to the 'Registered' role.
                        await _usermanager.AddToRoleAsync(user, "Registered");

                        user.AccessLevel = "Registered";
                        user.AccountStatus = "Active";

                        // Remove Lockout and E-Mail confirmation
                        user.EmailConfirmed = true;
                        user.LockoutEnabled = false;
                    }
                    // Register this external provider to the user
                    await _usermanager.AddLoginAsync(user, info);

                    // Persist everything into the Db
                    await _membershipContext.SaveChangesAsync();
                }

                // create the auth JSON object
                var auth = new
                {
                    type = "External",
                    providerName = info.LoginProvider
                };

                // output a <SCRIPT> tag to call a JS function registered into the parent window global scope
                return Content(
                    "<script type=\"text/javascript\">" +
                    "window.opener.externalProviderLogin(" + JsonConvert.SerializeObject(auth) + ");" +
                    "window.close();" +
                    "</script>",
                    "text/html"
                    );
            }
            catch (Exception ex)
            {
                // return a HTTP Status 400 (Bad Request) to the client
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                _signinmanager.SignOutAsync().Wait();
            }
            return new JsonResult(true, DefaultJsonSettings);
        }
        #endregion External Authentication Providers
    }
}


