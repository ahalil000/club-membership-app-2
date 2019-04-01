using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IO;
using MembershipWebApp.Domain;
using MembershipWebApp.Interfaces;

namespace MembershipWebApp.Services
{
    public class ConfigurationDataRequest : IConfigurationDataRequest
    {
        public Config ConfigEntries()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("configuration.json")
                .Build();

            var iisfolder = config.GetValue<string>("AppFolder:iisfolder");
            var environment = config.GetValue<string>("CurrentEnvironment:Environment");
            return new Config()
            {
                Environment = environment,
                IISFolder = iisfolder
            };
        }
    }
}
