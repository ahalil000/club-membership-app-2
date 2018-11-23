using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MembershipWebApp.Domain;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Interfaces
{
    public interface IMembershipDetailDataRequest
    {
        //List<MemberDetails> GetList();
        MemberDetails GetMemberDetailEntry(int id);

        bool AddNewMemberDetailEntry(int memberID, 
                               bool receivenewsletter,
                               string daysofweekattend,
                               DateTime datejoined,
                               string memberlevel,
                               decimal memberfee,
                               DateTime renewalreminderdate,
                               bool ismemberfeepaid);

        bool EditMemberDetailEntry(int id,
                               int memberID,
                               bool receivenewsletter,
                               string daysofweekattend,
                               DateTime datejoined,
                               string memberlevel,
                               decimal memberfee,
                               DateTime renewalreminderdate,
                               bool ismemberfeepaid);

        bool DeleteMemberDetailEntry(int id);
        int Count();
        DayOfWeekSelectedViewModel PopulateDaysOfWeekSelections(string daysofweekstr);
        string SetDaysOfWeekTextFromDaysOfWeekSelections(DayOfWeekSelectedViewModel daysofweekmodel);
    }
}
