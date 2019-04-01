using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Interfaces;
using MembershipWebApp.Domain;
using AutoMapper;
using Newtonsoft.Json;

namespace MembershipWebApp.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationDataController : Controller
    {
        private readonly IConfigurationDataRequest _configrequest;
        private readonly IMapper _objectmapper;

        public ConfigurationDataController(
            IConfigurationDataRequest configrequest,
            IMapper objectmapper)
        {
            _configrequest = configrequest;
            _objectmapper = objectmapper;
        }

        #region RESTful Conventions
        /// <summary>
        /// GET: api/MemberData
        /// </summary>
        /// <returns>Nothing: this method will raise a NotFound HTTP exception, since we're not supporting this API call.</returns>
        [HttpGet()]
        public IActionResult Get()
        {
            Config cfg = _configrequest.ConfigEntries();
            return new JsonResult(_objectmapper.Map<ConfigViewModel>(cfg), DefaultJsonSettings);            
        }
        #endregion

        /// <summary>
        /// Returns a suitable JsonSerializerSettings object that can be used to generate the JsonResult return value for this Controller's methods.
        /// </summary>
        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }


    }
}
