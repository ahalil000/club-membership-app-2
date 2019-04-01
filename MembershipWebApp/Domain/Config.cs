using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MembershipWebApp.Domain
{
    public class Config
    {
        /// <summary>
        /// IISFolder
        /// </summary>
        public string IISFolder { get; set; }

        /// <summary>
        /// Environment
        /// </summary>
        public string Environment { get; set; }

        /// <summary>
        /// AppFolder
        /// </summary>
        public string AppFolder { get; set; }
    }
}
