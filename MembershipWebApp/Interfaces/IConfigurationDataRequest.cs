using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MembershipWebApp.Domain;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Interfaces
{
    public interface IConfigurationDataRequest
    {
        Config ConfigEntries();
    }
}
