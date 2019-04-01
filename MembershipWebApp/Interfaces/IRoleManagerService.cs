using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipWebApp.Interfaces
{
    public interface IRoleManagerService
    {
        Task<bool> IsUserInRole(string userName, string role);
    }
}
