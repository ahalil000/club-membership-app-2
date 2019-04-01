using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IO;
using MembershipWebApp.Domain;
using MembershipWebApp.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MembershipWebApp.Services
{
    public class RoleManagerService: IRoleManagerService
    {
        private MembershipContext db;
        private readonly UserManager<ApplicationUser> userManager;

        public RoleManagerService(MembershipContext _db, UserManager<ApplicationUser> _userManager)
        {
            db = _db;
            userManager = _userManager;
        }

        public async Task<bool> IsUserInRole(string userName, string role)
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user != null)
            {
                return await userManager.IsInRoleAsync(user, role);
            }
            return false;
        }
    }
}
