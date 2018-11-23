using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MembershipWebApp.Domain;

namespace MembershipWebApp.Interfaces
{
    public interface IMembershipDataRequest
    {
        List<Member> GetList();
        Member GetMemberEntry(int id);
        bool AddNewMemberEntry(string firstname, 
                               string lastname,
                               string emailaddress,
                               string contactnumber,
                               DateTime dateofbirth,
                               string accountstatus);
        bool EditMemberEntry(int id,
                               string firstname,
                               string lastname,
                               string emailaddress,
                               string contactnumber,
                               DateTime dateofbirth,
                               string accountstatus);
        bool DeleteMemberEntry(int id);
        int Count();
        //IEnumerable<Glossary.Common.Models.GlossaryEntry> SortGlossary(SortOrdering sorting);
    }
}
