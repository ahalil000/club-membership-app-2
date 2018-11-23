using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MembershipWebApp.Domain
{
    public class MemberAddress
    {
        /// <summary>
        /// ID
        /// </summary>
        [Key]
        [Required]
        public int ID { get; set; }

        /// <summary>
        /// MemberID - Foreign Key ID to Member table
        /// </summary>
        [Required]
        public int MemberID { get; set; }

        /// <summary>
        /// AddressLine1 - Length 100
        /// </summary>
        public string AddressLine1 { get; set; }

        /// <summary>
        /// AddressLine2 - Length 100
        /// </summary>
        public string AddressLine2 { get; set; }

        /// <summary>
        /// Suburb - Length 50
        /// </summary>
        public string Suburb { get; set; }

        /// <summary>
        /// State - Length 50
        /// </summary>
        public string State { get; set; }

        /// <summary>
        /// PostCode - Length 10
        /// </summary>
        public string PostCode { get; set; }

        #region related_properties
        //[ForeignKey("MemberId")]
        public virtual Member Member { get; set; }
        #endregion
    }
}
