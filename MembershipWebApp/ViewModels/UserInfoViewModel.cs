using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipWebApp.ViewModels
{
    public class UserInfoViewModel
    {
        private string _username = "";
        private Int32 _userId = 0;
        private List<string> _roles = null;

        #region Constructor
        public UserInfoViewModel()
        {
            _username = "";
            _userId = 0;
            _roles = new List<string>();
        }
        #endregion Constructor

        #region Properties
        public List<string> GetRoles
        {
            get { return _roles; }
            set { _roles = value; }
        }

        public string UserName { get { return _username; } set { _username = value; } }
        public Int32 UserId { get { return _userId; } set { _userId = value; } }
        #endregion Properties
    }
}
