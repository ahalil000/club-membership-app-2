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
    public class MembershipDataRequest : IMembershipDataRequest
    {
        private MembershipContext db; 

        public MembershipDataRequest(MembershipContext _db)
        {
            db = _db;
        }

        public bool AddNewMemberEntry(string firstname, string lastname, string emailaddress, string contactnumber, DateTime dateofbirth, string accountstatus)
        {
             // override any property that could be wise to set from server-side only
            Member member = new Member()
            {
                FirstName = firstname,
                LastName = lastname,
                AccountStatus = accountstatus,
                ContactNumber = contactnumber,
                DateOfBirth = dateofbirth,
                EmailAddress = emailaddress,
                LastUpdated = DateTime.Now
            };

            // add the new item
            db.Members.Add(member);

            // persist the changes into the Database.
            db.SaveChanges();

            // return the newly-created Item to the client.
            return true;
        }

        public int Count()
        {
            return Convert.ToInt32(db.Members.Count().ToString());
        }

        public bool DeleteMemberEntry(int id)
        {
            var item = db.Members.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // remove the item to delete from the DbContext.
                db.Members.Remove(item);

                // persist the changes into the Database.
                db.SaveChanges();

                return true;
            }
            return false;
        }

        public bool EditMemberEntry(int id, string firstname, string lastname, string emailaddress, string contactnumber, DateTime dateofbirth, string accountstatus)
        {
            var item = db.Members.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // handle the update (on per-property basis)
                item.FirstName = firstname;
                item.LastName = lastname;
                item.EmailAddress = emailaddress;
                item.ContactNumber = contactnumber;
                item.DateOfBirth = dateofbirth;
                item.AccountStatus = accountstatus;
                item.LastUpdated = DateTime.Now;

                //TODO - include a LastModifiedDate field

                // persist the changes into the Database.
                db.SaveChanges();

                // return the updated Item to the client.
                return true;
            }
            return false;
        }

        public List<Member> GetList()
        {
            return db.Members.ToList();
        }

        public Member GetMemberEntry(int id)
        {
            var item = db.Members.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
                return item;
            else
                return null;
        }
    }
}
