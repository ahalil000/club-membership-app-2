using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using MembershipWebApp.Domain;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Newtonsoft.Json;
using MembershipWebApp.Services;
using System.Collections.Generic;
using System.Security.Principal;
using Microsoft.AspNetCore.Http.Authentication;

namespace MembershipWebApp.Classes
{
    public class JwtProvider
    {
        #region Private Members
        private readonly RequestDelegate _next;

        // JWT-related members
        private TimeSpan TokenExpiration;
        private readonly SigningCredentials SigningCredentials;

        // EF and Identity members, available through DI
        private readonly MembershipContext DbContext;
        private readonly UserManager<ApplicationUser> UserManager;
        private readonly RoleManager<ApplicationRole> RoleManager;
        private readonly SignInManager<ApplicationUser> SignInManager;
        #endregion Private Members

        #region Static Members
        //private static readonly string PrivateKey = "private_key_1234567890";
        public static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "MembershipList";
        public static string TokenEndPoint = "/api/connect/token";
        #endregion Static Members

        #region Constructor
        public JwtProvider(
            RequestDelegate next,
            MembershipContext dbContext,
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _next = next;

            // Instantiate JWT-related members
            TokenExpiration = TimeSpan.FromMinutes(86400);
            SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            // Instantiate through Dependency Injection
            DbContext = dbContext;
            UserManager = userManager;
            SignInManager = signInManager;
            RoleManager = roleManager; 
        }
        #endregion Constructor

        #region Public Methods
        public Task Invoke(HttpContext httpContext)
        {
            // Check if the request path matches our LoginPath
            if (!httpContext.Request.Path.Equals(TokenEndPoint, StringComparison.Ordinal)) return _next(httpContext);

            // Check if the current request is a valid POST with the appropriate content type (application/x-www-form-urlencoded)
            if (httpContext.Request.Method.Equals("POST") && httpContext.Request.HasFormContentType)
            {
                // OK: generate token and send it via a json-formatted string
                return CreateToken(httpContext);
            }
            else
            {
                // Not OK: output a 400 - Bad request HTTP error.
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }
        }
        #endregion Public Methods

        #region Private Methods
        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                // retrieve the relevant FORM data
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];

                // check if there's an user with the given username
                var user = await UserManager.FindByNameAsync(username);
                // fallback to support e-mail address instead of username
                if (user == null && username.Contains("@")) user = await UserManager.FindByEmailAsync(username);

                //PasswordHashService phashService = new PasswordHashService();
                //string phash = phashService.HashPassword(password);
                var success = user != null && await UserManager.CheckPasswordAsync(user, password);
                if (success)
                {
                    DateTime now = DateTime.UtcNow;

                    // add the registered claims for JWT (RFC7519).
                    // For more info, see https://tools.ietf.org/html/rfc7519#section-4.1
                    //var claims = new[] {
                    //    new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                    //    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                    //    // TODO: add additional claims here
                    //};

                    var claims = new List<Claim>() {
                        new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                        new Claim(ClaimTypes.NameIdentifier, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email.ToString())
                        
                        // TODO: add additional claims here
                    };

                    // build claims user roles
                    var userClaims = await UserManager.GetClaimsAsync(user);
                    var userRoles = await UserManager.GetRolesAsync(user);
                    if (userClaims != null)
                        claims.AddRange(userClaims);
                    foreach (var userRole in userRoles)
                    {
                        claims.Add(new Claim(ClaimTypes.Role, userRole));
                        var role = await RoleManager.FindByNameAsync(userRole);
                        if (role != null)
                        {
                            var roleClaims = await RoleManager.GetClaimsAsync(role);
                            foreach (Claim roleClaim in roleClaims)
                            {
                                claims.Add(roleClaim);
                            }
                        }
                    }

                    // Create the JWT and write it to a string
                    var token = new JwtSecurityToken(
                        claims: claims,
                        notBefore: now,
                        expires: now.Add(TokenExpiration),
                        signingCredentials: SigningCredentials);
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    // build the json response
                    var jwt = new
                    {
                        access_token = encodedToken,
                        expiration = (int)TokenExpiration.TotalSeconds
                    };

                    // convert roles to string array.
                    string[] roles = new string[userRoles.Count];
                    int i = 0;
                    foreach (string appuserrole in userRoles)
                    {
                        roles[i++] = appuserrole;
                    }
                    // set user
                    //var curruser = new GenericPrincipal(
                    //    new ClaimsIdentity(user.UserName), roles);
                    var useridentity = new ClaimsIdentity(claims, "Bearer");
                    var curruser = new GenericPrincipal(
                        useridentity, roles);
                    httpContext.User = curruser;
                    ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(useridentity);

                    //await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(httpContext); // "MyCookieMiddlewareInstance");
                    //await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(httpContext
                    //await httpContext.Authentication.SignInAsync("MyCookieMiddlewareInstance", claimsPrincipal,
                    //    new AuthenticationProperties
                    //    {
                    //        ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                    //        IsPersistent = false,
                    //        AllowRefresh = false
                    //    });

                    // return token
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));
                    return;
                }
            }
            catch (Exception ex)
            {
                // TODO: handle errors
                throw ex;
            }

            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsync("Invalid username or password.");
        }
        #endregion Private Methods
    }

    #region Extension Methods
    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtProviderExtensions
    {
        public static IApplicationBuilder UseJwtProvider(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtProvider>();
        }
    }
    #endregion Extension Methods
}
