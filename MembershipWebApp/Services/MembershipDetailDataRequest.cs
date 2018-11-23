using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MembershipWebApp.Interfaces;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Domain;

namespace MembershipWebApp.Services
{
    public class MembershipDetailDataRequest : IMembershipDetailDataRequest
    {
        private MembershipContext db; 

        public MembershipDetailDataRequest(MembershipContext _db)
        {
            db = _db;
        }

        public bool AddNewMemberDetailEntry(int memberID, bool receivenewsletter, string daysofweekattend, DateTime datejoined, string memberlevel, decimal memberfee, DateTime renewalreminderdate, bool ismemberfeepaid)
        {
            // override any property that could be wise to set from server-side only
            MemberDetails memberdetails = new MemberDetails()
            {
                MemberID = memberID,
                DateJoined = datejoined,
                DaysOfWeekAttend = daysofweekattend,
                IsMemberFeePaid = ismemberfeepaid,
                MemberFee = memberfee,
                MemberLevel = memberlevel,
                ReceiveNewsLetter = receivenewsletter,
                RenewalReminderDate = renewalreminderdate
                //LastUpdated = DateTime.Now
            };

            // add the new item
            db.MemberDetails.Add(memberdetails);

            // persist the changes into the Database.
            db.SaveChanges();

            // return the newly-created Item to the client.
            return true;
        }

        public int Count()
        {
            throw new NotImplementedException();
        }

        public bool DeleteMemberDetailEntry(int id)
        {
            var item = db.MemberDetails.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // remove the item to delete from the DbContext.
                db.MemberDetails.Remove(item);

                // persist the changes into the Database.
                db.SaveChanges();

                return true;
            }
            return false;
        }

        public bool EditMemberDetailEntry(int id, int memberID, bool receivenewsletter, string daysofweekattend, DateTime datejoined, string memberlevel, decimal memberfee, DateTime renewalreminderdate, bool ismemberfeepaid)
        {
            var item = db.MemberDetails.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // handle the update (on per-property basis)
                item.MemberID = memberID;
                item.IsMemberFeePaid = ismemberfeepaid;
                item.MemberFee = memberfee;
                item.MemberLevel = memberlevel;
                item.ReceiveNewsLetter = receivenewsletter;
                item.RenewalReminderDate = renewalreminderdate;
                item.DateJoined = datejoined;
                item.DaysOfWeekAttend = daysofweekattend;
                //item.LastUpdated = DateTime.Now;

                //TODO - include a LastModifiedDate field

                // persist the changes into the Database.
                db.SaveChanges();

                // return the updated Item to the client.
                return true;
            }
            return false;
        }

        public MemberDetails GetMemberDetailEntry(int id)
        {
            var item = db.MemberDetails.Where(i => i.MemberID == id).FirstOrDefault();
            item.DaysOfWeekAttendSelected = PopulateDaysOfWeekSelections(item.DaysOfWeekAttend); 
            if (item != null)
                return item;
            else
                return null;
        }

        public DayOfWeekSelectedViewModel PopulateDaysOfWeekSelections(string daysofweekstr)
        {
            DayOfWeekSelectedViewModel days = new DayOfWeekSelectedViewModel()
            {
                Monday = false, Tuesday = false, Wednesday = false, Thursday = false,
                Friday = false, Saturday = false, Sunday = false
            };
            if (daysofweekstr.Length < 7)
                return days;
            for (int i=0; i<daysofweekstr.Length; i++)
            {
                if ((daysofweekstr[i] == '1') && (i == 0)) { days.Monday = true; }
                if ((daysofweekstr[i] == '1') && (i == 1)) { days.Tuesday = true; }
                if ((daysofweekstr[i] == '1') && (i == 2)) { days.Wednesday = true; }
                if ((daysofweekstr[i] == '1') && (i == 3)) { days.Thursday = true; }
                if ((daysofweekstr[i] == '1') && (i == 4)) { days.Friday = true; }
                if ((daysofweekstr[i] == '1') && (i == 5)) { days.Saturday = true; }
                if ((daysofweekstr[i] == '1') && (i == 6)) { days.Sunday = true; }
            }
            return days;
        }


        public string SetDaysOfWeekTextFromDaysOfWeekSelections(DayOfWeekSelectedViewModel daysofweekmodel)
        {
            if (daysofweekmodel == null)
                return "0000000";
            string tempstr = "";
            if (daysofweekmodel.Monday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Tuesday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Wednesday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Thursday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Friday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Saturday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            if (daysofweekmodel.Sunday) { tempstr = tempstr + "1"; } else { tempstr = tempstr + "0"; }
            return tempstr;
        }

    }
}
