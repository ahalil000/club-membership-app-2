using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MembershipWebApp.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MembershipWebApp.ViewModels;

namespace MembershipWebApp.Domain
{
    public class MemberDetails
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
        /// ReceiveNewsLetter
        /// </summary>
        public bool ReceiveNewsLetter { get; set; }


        /// <summary>
        /// DaysOfWeekAttend - Length 7 chars
        /// </summary>
        public string DaysOfWeekAttend { get; set; }

        [NotMapped]
        public DayOfWeekSelectedViewModel DaysOfWeekAttendSelected { get; set; }

        /// <summary>
        /// DateJoined
        /// </summary>
        public DateTime DateJoined { get; set; }

        /// <summary>
        /// MemberLevel - Starter, Associate, Premium, Gold
        /// </summary>
        public string MemberLevel { get; set; }

        /// <summary>
        /// MemberFee
        /// </summary>
        /// see https://mattferderer.com/entity-framework-no-type-was-specified-for-the-decimal-column 
        /// for reason for this declaration 
        [Column(TypeName = "decimal(18,2)")]
        public decimal MemberFee { get; set; }

        /// <summary>
        /// Date for membership renewal reminder. 
        /// </summary>
        public DateTime RenewalReminderDate { get; set; }

        /// <summary>
        /// Flag for member fee paid.
        /// </summary>
        public bool IsMemberFeePaid { get; set; }

        #region related_properties
        //[ForeignKey("MemberId")]
        public virtual Member Member { get; set; }
        #endregion
    }
}
