using System;
using System.ComponentModel;
using Newtonsoft.Json;

namespace MembershipWebApp.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserDetailsViewModel
    {
        #region Constructor
        public UserDetailsViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public bool InGuestRole { get; set; }
        public bool InAdminRole { get; set; }
        #endregion Properties
    }
}
