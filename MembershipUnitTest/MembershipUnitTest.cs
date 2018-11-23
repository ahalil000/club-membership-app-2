using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using System.Collections.Generic;
using System.IO;
using System;
using System.Net.Http;
using MembershipWebApp.Domain;
using MembershipWebApp.Interfaces;
using MembershipWebApp.Services;

namespace MembershipUnitTest
{
    [TestClass]
    public class MembershipUnitTest
    {
        private readonly IMembershipDataRequest _memberrequest;

        public MembershipUnitTest()
        {
            var services = new ServiceCollection();
            services.AddScoped<IMembershipDataRequest, MembershipDataRequest>();
            services.AddDbContext<MembershipContext>(options => options.UseInMemoryDatabase("Test_In_Memory_DB"));

            var serviceProvider = services.BuildServiceProvider();

            _memberrequest = serviceProvider.GetService<IMembershipDataRequest>();
        }

        [TestMethod]
        public void UnitTestAddMemberRecords()
        {
            _memberrequest.AddNewMemberEntry(
                "Bill", 
                "Blogs",
                "abc@acd.com.au", 
                "0229230292",
                DateTime.Parse("1990-10-12"), 
                "Active"
                );

            int ct = _memberrequest.Count();

            Assert.IsTrue(ct == 1);
        }

        [TestMethod]
        public void UnitTestUpdateMemberRecords()
        {
            // Add reecord
            _memberrequest.AddNewMemberEntry(
                "Bill",
                "Blogs",
                "abc@acd.com.au",
                "0229230292",
                DateTime.Parse("1990-10-12"),
                "Active"
                );

            // Retrieve record.
            Member member = _memberrequest.GetMemberEntry(1);
            int key = 0;

            if (member != null)
            {
                key = member.ID;
            }
            else
            {
                Assert.Fail("Cannot retrieve Member record");
            }

            string valueToUpdate = "Bob";

            // Update record.
            _memberrequest.EditMemberEntry(
                key,
                valueToUpdate,
                member.LastName,
                member.EmailAddress,
                member.ContactNumber,
                member.DateOfBirth,
                member.AccountStatus
            );

            // Retrieve updated record. 
            member = _memberrequest.GetMemberEntry(1);
            key = 0;

            if (member != null)
            {
                key = member.ID;
            }
            else
            {
                Assert.Fail("Cannot retrieve updated Member record");
            }

            Assert.IsTrue(member.FirstName == valueToUpdate);
        }


        [TestMethod]
        public void UnitTestDeleteMemberRecords()
        {
            // Add reecord
            _memberrequest.AddNewMemberEntry(
                "Bill",
                "Blogs",
                "abc@acd.com.au",
                "0229230292",
                DateTime.Parse("1990-10-12"),
                "Active"
                );

            // Check count is 1
            int ct = _memberrequest.Count();

            Assert.IsTrue(ct == 1);

            // Remove member record.
            _memberrequest.DeleteMemberEntry(1);

            // Check count is 0
            ct = _memberrequest.Count();

            Assert.IsTrue(ct == 0);
        }
    }
}
