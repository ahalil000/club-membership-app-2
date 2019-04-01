using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MembershipWebApp.Domain
{
    public class ApplicationUserRole: IdentityUserRole<int> // : IdentityUser
    {
        #region Constructor
        public ApplicationUserRole()
        {

        }
        #endregion Constructor

        #region Properties
        //[Key]
        //[Required]
        //public int Id { get; set; }

        //[Required]
        //public int UserId { get; set; }

        //[Required]
        //public int RoleId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region related_properties
        //[ForeignKey("Id")]
        public virtual ApplicationUser User { get; set; }
        public virtual ApplicationRole Role { get; set; }
        #endregion
    }
}
