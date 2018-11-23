using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MembershipWebApp.Domain;

namespace MembershipWebApp.Interfaces
{
    public interface ISeedData
    {
        void GenerateMembers(int membersize);
        Member GenerateRandomMember();
    }
}
