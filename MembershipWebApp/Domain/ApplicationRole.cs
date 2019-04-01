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
    public class ApplicationRole: IdentityRole<int> // : IdentityUser
    {
        #region Constructor
        public ApplicationRole()
        {

        }
        #endregion Constructor

        #region Properties
        //[Key]
        //[Required]
        //public int Id { get; set; }

        //[Required]
        //public string Name { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
        #endregion Properties

        #region related_properties
        //[ForeignKey("Id")]
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }
        #endregion

    }
}
