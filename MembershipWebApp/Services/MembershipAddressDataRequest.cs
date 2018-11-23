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
    public class MembershipAddressDataRequest : IMembershipAddressDataRequest
    {
        private MembershipContext db; 

        public MembershipAddressDataRequest(MembershipContext _db)
        {
            db = _db;
        }

        public bool AddNewMemberAddressEntry(int memberID, string addressline1, string addressline2, string suburb, string state, string postcode)
        {
            // override any property that could be wise to set from server-side only
            MemberAddress memberAddress = new MemberAddress()
            {
                MemberID = memberID,
                AddressLine1 = addressline1,
                AddressLine2 = addressline2,
                Suburb = suburb,
                State = state,
                PostCode = postcode
            };

            // add the new item
            db.MemberAddresses.Add(memberAddress);

            // persist the changes into the Database.
            db.SaveChanges();

            // return the newly-created Item to the client.
            return true;
        }

        public int Count()
        {
            throw new NotImplementedException();
        }

        public bool DeleteMemberAddressEntry(int id)
        {
            var item = db.MemberAddresses.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // remove the item to delete from the DbContext.
                db.MemberAddresses.Remove(item);

                // persist the changes into the Database.
                db.SaveChanges();

                return true;
            }
            return false;
        }

 
        public bool EditMemberAddressEntry(int id, int memberID, string addressline1, string addressline2, string suburb, string state, string postcode)
        {
            var item = db.MemberAddresses.Where(i => i.ID == id).FirstOrDefault();
            if (item != null)
            {
                // handle the update (on per-property basis)
                item.MemberID = memberID;
                item.AddressLine1 = addressline1;
                item.AddressLine2 = addressline2;
                item.Suburb = suburb;
                item.State = state;
                item.PostCode = postcode;
                //item.LastUpdated = DateTime.Now;

                //TODO - include a LastModifiedDate field

                // persist the changes into the Database.
                db.SaveChanges();

                // return the updated Item to the client.
                return true;
            }
            return false;
        }

        public MemberAddress GetMemberAddressEntry(int id)
        {
            var item = db.MemberAddresses.Where(i => i.MemberID == id).FirstOrDefault();
            if (item != null)
                return item;
            else
                return null;
        }
    }
}
