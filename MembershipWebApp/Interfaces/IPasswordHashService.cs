using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipWebApp.Interfaces
{
    public interface IPasswordHashService
    {
        string HashPassword(string password);
    }
}
