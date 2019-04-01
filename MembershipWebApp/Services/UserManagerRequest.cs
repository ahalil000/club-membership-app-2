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
    public class UserManagerRequest3 : UserManager<ApplicationUser>
    {
        private IUserStore<ApplicationUser> _userStore;

        public UserManagerRequest3(
            IUserStore<ApplicationUser> userStore,
            IOptions<IdentityOptions> optionsAccessor, 
            IPasswordHasher<ApplicationUser> passwordHasher,
            IEnumerable<IUserValidator<ApplicationUser>> userValidators,
            IEnumerable<IPasswordValidator<ApplicationUser>> passwordValidators, 
            ILookupNormalizer keyNormalizer, 
            IdentityErrorDescriber errors,
            IServiceProvider services, 
            ILogger<UserManager<ApplicationUser>> logger)
             : base(userStore, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger
            )
        {
            _userStore = userStore;

            this.Options.User.RequireUniqueEmail = true;
            
        }

        //public async Task<ApplicationUser> FindAsync(string name, string password)
        //{
        //    ApplicationUser user = await FindByNameAsync(name);
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    return await CheckPasswordAsync(user, password) ? user : null;
        //}

        //public async Task<ApplicationUser> FindAsync(string name, string password)
        //{
        //    ApplicationUser user = await _userStore. FindByNameAsync(name);
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    return await CheckPasswordAsync(user, password) ? user : null;
        //}


    }
}
