using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using MembershipWebApp.Interfaces;
using Microsoft.AspNetCore.Identity;
using MembershipWebApp.Services;
using System.Security.Claims;

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
        private RoleManager<ApplicationRole> roleManager;
        private UserManager<ApplicationUser> userManager;

        private IPasswordHashService p_hasher;

        public SeedData(MembershipContext _db, PasswordHashService _p_hasher,
                        UserManager<ApplicationUser> _userManager,
                        RoleManager<ApplicationRole> _roleManager)
        {
            db = _db;
            p_hasher = _p_hasher;
            roleManager = _roleManager;
            userManager = _userManager;
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

            Dictionary<string, string> postcodes = new Dictionary<string, string>
            {
                { "Ryde", "2112" },
                { "Marsfield", "2122" },
                { "Epping", "2121" },
                { "Macquarie Park", "2113" },
                { "Eastwood", "2122" },
                { "Denistone", "2114" }
            };

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

        /// <summary>
        /// Create users
        /// </summary>
        //public async void CreateUsersAsync()
        public void CreateUsers()
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;
            string role_Administrators = "Administrators";
            //string role_Registered = "Registered";
            string role_Guest = "Guest";

            //Create Roles (if they doesn't exist yet)

            // Add roles .. 
            var Role_Admin = new ApplicationRole()
            {
                Name = role_Administrators,
                NormalizedName = role_Administrators,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            db.Roles.Add(Role_Admin);

            db.SaveChanges();

            int role_admin_id = 0;
            var roleadmin = db.Roles.Where(a => a.Name == role_Administrators).SingleOrDefault();
            if (roleadmin != null)
            {
                role_admin_id = roleadmin.Id;
            }

            var Role_Guest = new ApplicationRole()
            {
                Name = role_Guest,
                NormalizedName = role_Guest,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            db.Roles.Add(Role_Guest);

            db.SaveChanges();

            int role_guest_id = 0;
            var roleguest = db.Roles.Where(a => a.Name == role_Guest).SingleOrDefault();
            if (roleguest != null)
            {
                role_guest_id = roleguest.Id;
            }

            // Role claims
            var adminRole = roleManager.FindByNameAsync(role_Administrators).GetAwaiter().GetResult();
            if (adminRole != null)
            {
                //adminRole = new IdentityRole("Admin");
                //await roleManager.CreateAsync(adminRole);
                roleManager.AddClaimAsync(adminRole, new Claim("ApplicationAccess", "AddNewUser"));
            }

            // Role claims
            var guestRole = roleManager.FindByNameAsync(role_Guest).GetAwaiter().GetResult();
            if (guestRole != null)
            {
                //adminRole = new IdentityRole("Admin");
                //await roleManager.CreateAsync(adminRole);
                roleManager.AddClaimAsync(guestRole, new Claim("ApplicationAccess", "AddNewUser"));
            }


            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                UserName = "Admin",
                NormalizedUserName = "Admin",
                DisplayName = "Admin User",
                Email = "admin@membershiplist.com",
                NormalizedEmail = "admin@membershiplist.com",
                //Password = "Pass4Admin",
                //PasswordHash = p_hasher.HashPassword("Pass4Admin"), 
                CreatedDate = createdDate,
                AccessLevel = role_Administrators,
                AccountStatus = "Active",
                Notes = "",
                Type = 0,
                PwdLastChanged = lastModifiedDate,
                LastModifiedDate = lastModifiedDate
            };

            var passwordHash = userManager.PasswordHasher.HashPassword(user_Admin, "Pass4Admin");
            user_Admin.PasswordHash = passwordHash;

            //await db.Users.AddAsync(user_Admin);
            db.Users.Add(user_Admin);
            //await db.SaveChangesAsync();
            db.SaveChanges();

            // Insert "Admin" into the Database and also assign the "Administrator" role to him.
            int admin_id = 0;
            var adminuser = db.Users.Where(a => a.UserName == "Admin").SingleOrDefault();
            if (adminuser != null)
            {
                admin_id = adminuser.Id;
            }

            var user_Guest = new ApplicationUser()
            {
                UserName = "Guest",
                NormalizedUserName = "Guest",
                DisplayName = "Guest User",
                Email = "guest@membershiplist.com",
                NormalizedEmail = "guest@membershiplist.com",
                //Password = "Pass4Guest",
                //PasswordHash = p_hasher.HashPassword("Pass4Guest"),
                CreatedDate = createdDate,
                AccessLevel = role_Guest,
                AccountStatus = "Active",
                Notes = "",
                Type = 0,
                PwdLastChanged = lastModifiedDate,
                LastModifiedDate = lastModifiedDate
            };

            var passwordHash2 = userManager.PasswordHasher.HashPassword(user_Admin, "Pass4Guest");
            user_Guest.PasswordHash = passwordHash2;

            //await db.Users.AddAsync(user_Guest);
            db.Users.Add(user_Guest);
            //await db.SaveChangesAsync();
            db.SaveChanges();

            // Insert "Guest" into the Database and also assign the "Guest" role to him.
            int guest_id = 0;
            var guestuser = db.Users.Where(a => a.UserName == "Guest").SingleOrDefault();
            if (guestuser != null)
            {
                guest_id = guestuser.Id;
            }

            // Add user roles .. 
            var user_Role_Admin = new ApplicationUserRole()
            {
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                RoleId = role_admin_id,
                UserId = admin_id
            };

            //await db.UserRoles.AddAsync(user_Role_Admin);
            db.UserRoles.Add(user_Role_Admin);

            var user_Role_Guest = new ApplicationUserRole()
            {
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                RoleId = role_guest_id,
                UserId = guest_id
            };

            db.UserRoles.Add(user_Role_Guest);
            //await db.UserRoles.AddAsync(user_Role_Guest);

            db.SaveChanges();
            //await db.SaveChangesAsync();
        }

    }
}
