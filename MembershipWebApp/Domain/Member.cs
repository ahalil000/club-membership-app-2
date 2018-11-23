using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MembershipWebApp.Domain
{
    public class Member
    {
        /// <summary>
        /// ID
        /// </summary>
        [Key]
        [Required]
        public int ID { get; set; }

        /// <summary>
        /// FirstName - max length 50
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// LastName - max length 50
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// EmailAddress - max length 100
        /// </summary>
        public string EmailAddress { get; set; }

        /// <summary>
        /// ContactNumber - max length 20
        /// </summary>
        public string ContactNumber { get; set; }

        /// <summary>
        /// DateJoined
        /// </summary>
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// DateJoined
        /// </summary>
        public DateTime LastUpdated { get; set; }

        /// <summary>
        /// AccountStatus
        /// </summary>
        public string AccountStatus { get; set; }

        public MemberAddress MemberAddress { get; set; }

        public MemberDetails MemberDetails { get; set; }
    }
}
