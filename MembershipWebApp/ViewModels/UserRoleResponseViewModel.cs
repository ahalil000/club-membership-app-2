using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipWebApp.ViewModels
{
    public class UserRoleResponseViewModel
    {
        #region Properties
        public string UserName { get; set; }
        public List<string> roles { get; set; }
        #endregion
    }
}
