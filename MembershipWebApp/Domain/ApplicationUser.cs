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
    public class ApplicationUser: IdentityUser<int>
    {
        #region Constructor
        public ApplicationUser()
        {

        }
        #endregion Constructor

        #region Properties
        //[Key]
        //[Required]
        //public int Id { get; set; }

        //[Required]
        //[MaxLength(128)]
        //public string UserName { get; set; }

        //[Required]
        //public string Email { get; set; }

        //[Required]
        //public string Password { get; set; }

        [MaxLength(256)]
        public string DisplayName { get; set; }

        public string Notes { get; set; }

        [Required]
        public string AccountStatus { get; set; }

        public DateTime PwdLastChanged { get; set; }

        [Required]
        public string AccessLevel { get; set; }

        [Required]
        public int Type { get; set; }
        [Required]
        public int Flags { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
        //[Required]
        //public bool EmailConfirmed { get; set; }
        //[Required]
        //public bool LockoutEnabled { get; set; }

        #endregion Properties

        #region related_properties
        //public virtual ICollection<ApplicationRole> Roles { get; set; }
        public virtual ICollection<IdentityUserClaim<int>> Claims { get; set; }
        public virtual ICollection<IdentityUserLogin<int>> Logins { get; set; }
        public virtual ICollection<IdentityUserToken<int>> Tokens { get; set; }
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }
        #endregion
    }
}
