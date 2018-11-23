using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MembershipWebApp.Domain;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Interfaces
{
    public interface IMembershipAddressDataRequest
    {
        MemberAddress GetMemberAddressEntry(int id);

        bool AddNewMemberAddressEntry(int memberID, 
                               string addressline1,
                               string addressline2,
                               string suburb,
                               string state,
                               string postcode);

        bool EditMemberAddressEntry(int id,
                               int memberID,
                               string addressline1,
                               string addressline2,
                               string suburb,
                               string state,
                               string postcode);

        bool DeleteMemberAddressEntry(int id);
        int Count();
    }
}
