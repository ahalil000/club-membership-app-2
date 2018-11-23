using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using MembershipWebApp.Interfaces;

namespace MembershipWebApp.Domain
{
    /// <summary>
    /// SeedData
    /// Use this class to generate once off or periodic regeneration of rendomized membership
    /// data for mocking or testing purposes.
    /// </summary>
    public class SeedData : ISeedData
    {
        private MembershipContext db;

        public SeedData(MembershipContext _db)
        {
            db = _db;
        }

        // Use this to generate all membership sample data - Member, MemberDetails, MemberAddress
        public void GenerateMembers(int membersize)
        {
            for (int i = 0; i < membersize; i++)
            {
                Member member = GenerateRandomMember();
                db.Members.Add(member);

                MemberDetails details = GenerateRandomMemberDetail(member);
                db.MemberDetails.Add(details);

                MemberAddress address = GenerateRandomMemberAddress(member);
                db.MemberAddresses.Add(address);
            }
            db.SaveChanges();
        }

        // Use this to generate member details only.
        public void GenerateMemberDetails()
        {
            List<Member> lmem = db.Members.ToList();
            foreach (Member mem in lmem)
            {
                MemberDetails details = GenerateRandomMemberDetail(mem);
                db.MemberDetails.Add(details);
            }
            db.SaveChanges();
        }

        // Use this to generate member addresses only.
        public void GenerateMemberAddresses()
        {
            List<Member> lmem = db.Members.ToList();
            foreach (Member mem in lmem)
            {
                MemberAddress address = GenerateRandomMemberAddress(mem);
                db.MemberAddresses.Add(address);
            }
            db.SaveChanges();
        }


        /// <summary>
        /// Return random integer of maxmimum size max.
        /// </summary>
        /// <param name="max"></param>
        /// <returns></returns>
        public int GetRandomInteger(int max)
        {
            long rndval = 0;
            string strTick = "";
            for (int i = 0; i < 3; i++)
            {
                strTick = DateTime.Now.Ticks.ToString();
                strTick = strTick.Substring(strTick.Length - 5, 5);
                rndval = (Convert.ToInt32(strTick) * DateTime.Now.Millisecond * DateTime.Now.Second) % max;
                if (rndval < max)
                    break;
            }
            return (int)Math.Abs(rndval);
        }

        public Member GenerateRandomMember()
        {
            string[] malenames = { "Andrew", "Bob", "Colin", "Dave", "Edward", "Fred", "George", "Harry", "Ian", "John", "Kevin", "Peter", "Steve", "Thomas" };

            string[] femalenames = { "Alice", "Brenda", "Carol", "Daisy", "Ellen", "Grace", "Harriot", "Jenny", "Jill", "Lily", "Mary", "Peta", "Rose", "Sally", "Wendy" };
            string[] surnames = { "Andrews", "Barnes", "Collins", "Dixon", "Elliot", "Gordon", "Hall", "Jackson", "Moore", "Norton", "Oliver", "Peters", "Smith" };
            string[] firstnames = malenames.Concat(femalenames).ToArray<string>();

            double nextval;
            string rndfirstname;
            string rndlastname;
            string rndphone;
            string rndemail;
            DateTime rnddob;

            // Generate member

            // random name.
            rndfirstname = firstnames[GetRandomInteger(firstnames.Length)];

            rndlastname = surnames[GetRandomInteger(surnames.Length)];

            // random phone.
            string rndstr1 = "";
            for (int i = 0; i < 5; i++) { rndstr1 = rndstr1 + Convert.ToString(GetRandomInteger(999)); }
            rndphone = rndstr1.Substring(0, 10);

            // random email
            rndemail = Path.GetRandomFileName().Replace(".", "").Substring(0, 4) + "@" +
                       Path.GetRandomFileName().Replace(".", "").Substring(0, 4) + ".com";

            // random DOB
            nextval = (((double)GetRandomInteger(365 * 40) / (365 * 40)) * 365 * 40);
            DateTime dtStart = new DateTime(1960, 1, 1);
            rnddob = dtStart.AddDays(nextval);

            Member newMember = new Member()
            {
                FirstName = rndfirstname,
                LastName = rndlastname,
                ContactNumber = rndphone,
                EmailAddress = rndemail,
                DateOfBirth = rnddob,
                AccountStatus = "Active",
                LastUpdated = DateTime.Today
            };
            return newMember;
        }


        public MemberDetails GenerateRandomMemberDetail(Member currMember)
        {
            double nextval;
            string daysofweek;
            DateTime rndjoined;

            // random date joined
            nextval = (((double)GetRandomInteger(365 * 40) / (365 * 40)) * 365 * 10);
            DateTime dtStart = new DateTime(DateTime.Now.AddYears(-10).Year, 1, 1);
            rndjoined = dtStart.AddDays(nextval);

            // get membership level - 0(basic),1(associate),2(full)
            int memberlevel = (int)GetRandomInteger(3);
            string membershiplevel = "";
            switch (memberlevel)
            {
                case 0:
                    membershiplevel = "basic";
                    break;
                case 1:
                    membershiplevel = "associate";
                    break;
                case 2:
                    membershiplevel = "premium";
                    break;
            }

            // days of week attended - generate three times
            daysofweek = "0000000";
            char[] dow = new char[7];
            int numdaysattended = 0;
            for (int i = 0; i < 3; i++)
            {
                System.Threading.Thread.Sleep(3);
                nextval = (int)GetRandomInteger(7);
                dow = daysofweek.ToArray();
                dow[(int)nextval] = '1';
                daysofweek = new string(dow);
            }
            numdaysattended = daysofweek.Count(s => s == '1');
            DateTime dtRenewal = new DateTime(DateTime.Now.Year, rndjoined.Month, rndjoined.Day);
            // Add one year to calculated renewal date if default is earlier than today's date.
            if (dtRenewal < DateTime.Now)
                dtRenewal = dtRenewal.AddYears(1);

            MemberDetails details = new MemberDetails()
            {
                DateJoined = rndjoined,
                DaysOfWeekAttend = daysofweek,
                MemberLevel = membershiplevel,
                MemberFee = (10 * numdaysattended) * (memberlevel + 1),
                ReceiveNewsLetter = true,
                IsMemberFeePaid = true,
                RenewalReminderDate = dtRenewal,
                MemberID = currMember.ID,
                Member = currMember
            };
            return details;
        }

        public MemberAddress GenerateRandomMemberAddress(Member currMember)
        {
            double nextval;
            string rndstreetname;
            string rndroadtype;
            string rndsuburbname;
            string postcode = "";
            int doornumber;

            // random door number
            nextval = GetRandomInteger(499);
            doornumber = (nextval > 0 ? (int)nextval : 1);

            string[] streetnames = { "Blaxand", "Herring", "Epping", "Agincourt", "North", "Talavera", "Khartoum", "Lane Cove", "Ryde", "Waterloo", "Rowe", "Second", "South", "First" };
            string[] roadtypes = { "Road", "Street", "Lane", "Close", "Drive", "Ave" };
            string[] suburbs = { "Ryde", "Marsfield", "Epping", "Macquarie Park", "Eastwood", "Denistone" };

            Dictionary<string, string> postcodes = new Dictionary<string, string>();
            postcodes.Add("Ryde", "2112");
            postcodes.Add("Marsfield", "2122");
            postcodes.Add("Epping", "2121");
            postcodes.Add("Macquarie Park", "2113");
            postcodes.Add("Eastwood", "2122");
            postcodes.Add("Denistone", "2114");

            // Generate address

            // randon road type
            rndroadtype = roadtypes[GetRandomInteger(roadtypes.Length)];

            // random street address.
            rndstreetname = doornumber.ToString() + " " +
                            streetnames[GetRandomInteger(streetnames.Length)] + " " +
                            rndroadtype;

            // random suburb
            rndsuburbname = suburbs[GetRandomInteger(suburbs.Length)];

            // suburb and postcode
            KeyValuePair<string, string> val = postcodes.Where(a => a.Key == rndsuburbname).SingleOrDefault();
            if (val.Key != null)
                postcode = val.Value;

            MemberAddress address = new MemberAddress()
            {
                AddressLine1 = rndstreetname,
                AddressLine2 = "",
                Suburb = rndsuburbname,
                PostCode = postcode,
                State = "NSW",
                MemberID = currMember.ID
            };
            return address;
        }
    }
}
