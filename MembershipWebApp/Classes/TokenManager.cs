using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MembershipWebApp.ViewModels;
using System.Text;
using System.Collections.Generic;

namespace MembershipWebApp.Classes
{
    public class TokenManager
    {
        public static UserInfoViewModel ValidateToken(string token, string secret)
        {
            string username = null;
            (ClaimsPrincipal principal, IEnumerable<Claim> claims) = GetPrincipal(token, secret);

            if (principal == null)
                return null;

            ClaimsIdentity identity = null;
            try
            {
                identity = (ClaimsIdentity)principal.Identity;
            }
            catch (NullReferenceException)
            {
                return null;
            }

            //Claim usernameClaim = identity.FindFirst(ClaimTypes.Name);
            //username = usernameClaim.Value;
            //IEnumerable<Claim> userroleClaims = identity.FindAll(ClaimTypes.Role);
            Int32 nameID = 0;
            List<string> userRoles = new List<string>();
            userRoles.Add("Default");
            foreach (Claim itm in claims)
            {
                if (itm.Type == ClaimTypes.Role)
                    userRoles.Add(itm.Value);
                if (itm.Type == "nameid")
                    nameID = Convert.ToInt32(itm.Value);
            }

            //foreach (Claim itm in userroleClaims)
            //{
            //    userRoles.Add(itm.Value);
            //}
            return new UserInfoViewModel() { UserName = username, UserId = nameID, GetRoles = userRoles };
        }

        public static (ClaimsPrincipal, IEnumerable<Claim>) GetPrincipal(string token, string secret)
        {
            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);

                if (jwtToken == null)
                    return (null, null);

                byte[] key = Encoding.ASCII.GetBytes(secret);  //Convert.FromBase64String(secret);

                TokenValidationParameters parameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                SecurityToken securityToken;
                ClaimsPrincipal principal = tokenHandler.ValidateToken(token, parameters, out securityToken);
                return (principal, jwtToken.Claims);
            }
            catch (Exception e)
            {
                return (null, null);
            }
        }
    }
}