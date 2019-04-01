using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Domain;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;
using MembershipWebApp.Classes;

namespace MembershipWebApp.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        // JWT-related members
        private TimeSpan TokenExpiration;
        private readonly SigningCredentials SigningCredentials;

        #region Private Members
        public static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "MembershipList";
        public static string TokenEndPoint = "/api/connect/token";
        #endregion Private Members

        private readonly UserManager<ApplicationUser> _usermanager;
        private readonly RoleManager<ApplicationRole> _rolemanager;
        private readonly SignInManager<ApplicationUser> _signinmanager;

        #region Constructor
        public TokenController(
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
        )
        //: base()
        {
            _usermanager = userManager;
            _rolemanager = roleManager;
            _signinmanager = signInManager;

            TokenExpiration = TimeSpan.FromMinutes(86400);
            SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);
        }
        #endregion


        //[HttpPost("Auth")]
        //public IActionResult Jwt3(HttpContext httpContext) //  [FromBody]TokenRequestViewModel model)
        ////public IActionResult Auth([FromBody]TokenRequestViewModel model)
        //{
        //    // build & return the response
        //    var response = new TokenResponseViewModel()
        //    {
        //        token = "1234",
        //        expiration = 60000
        //    };
        //    return Json(response);
        //}

        //[HttpPost("Auth")]
        //[HttpPost()]
        //public IActionResult Login2([FromBody]TokenRequestViewModel model)
        ////public IActionResult Auth([FromBody]TokenRequestViewModel model)
        //{
        //    // build & return the response
        //    var response = new TokenResponseViewModel()
        //    {
        //        token = "1234",
        //        expiration = 60000
        //    };
        //    return Json(response);
        //}

        [HttpPost("Auth")]
        public async Task<IActionResult> Login([FromBody]TokenRequestViewModel model)
        //public IActionResult Auth([FromBody]TokenRequestViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null) return new StatusCodeResult(500);

            switch (model.grant_type)
            {
                case "password":
                    return await GetToken(model);
                default:
                    // not supported - return a HTTP 401 (Unauthorized)
                    return new UnauthorizedResult();
            }
        }


        private async Task<IActionResult> GetToken(TokenRequestViewModel model)
        {
            try
            {
                // check if there's an user with the given username
                var user = await _usermanager.FindByNameAsync(model.username);
                // fallback to support e-mail address instead of username
                if (user == null && model.username.Contains("@"))
                    user = await _usermanager.FindByEmailAsync(model.username);

                if (user == null
                    || !await _usermanager.CheckPasswordAsync(user, model.password))
                {
                    // user does not exists or password mismatch
                    return new UnauthorizedResult();
                }

                // username & password matches: create and return the Jwt token.

                DateTime now = DateTime.UtcNow;

                // add the registered claims for JWT (RFC7519).
                // For more info, see https://tools.ietf.org/html/rfc7519#section-4.1
                var claims = new List<Claim>() {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,
                        new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                    // TODO: add additional claims here
                };

                // build claims user roles
                var userClaims = await _usermanager.GetClaimsAsync(user);
                var userRoles = await _usermanager.GetRolesAsync(user);
                if (userClaims != null)
                    claims.AddRange(userClaims);
                foreach (var userRole in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));
                    var role = await _rolemanager.FindByNameAsync(userRole);
                    if (role != null)
                    {
                        var roleClaims = await _rolemanager.GetClaimsAsync(role);
                        foreach (Claim roleClaim in roleClaims)
                        {
                            claims.Add(roleClaim);
                        }
                    }
                }

                var tokenExpirationMins = (int)TokenExpiration.TotalMinutes;
                //                    Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                //var issuerSigningKey = new SymmetricSecurityKey(
                //Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));
                var issuerSigningKey = SecurityKey;

                var token = new JwtSecurityToken(
                    issuer: Issuer, // Configuration["Auth:Jwt:Issuer"],
                                    //audience: Configuration["Auth:Jwt:Audience"],
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                    signingCredentials: new SigningCredentials(
                        issuerSigningKey, SecurityAlgorithms.HmacSha256)
                );
                var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                // build & return the response
                var response = new TokenResponseViewModel()
                {
                    token = encodedToken,
                    expiration = tokenExpirationMins
                };
                return Json(response);
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }

        [Route("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            string currenttoken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer","").Trim();

            UserInfoViewModel uinfo = TokenManager.ValidateToken(currenttoken, PrivateKey);
            if (uinfo != null)
            {
                // Get user name 
                var user = await _usermanager.FindByIdAsync(uinfo.UserId.ToString());
                string userName = user.UserName;

                // build & return the response
                var response = new UserRoleResponseViewModel()
                {
                    UserName = userName,
                    roles = uinfo.GetRoles
                };
                return Json(response);
            }
            else
                return new UnauthorizedResult();
        }
    }
}
