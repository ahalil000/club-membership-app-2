using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MembershipWebApp.ViewModels;
using MembershipWebApp.Domain;

namespace MembershipWebApp.Mapping
{
    public class CustomMapping: Profile
    {
        public CustomMapping()
        {
            CreateMap<MemberViewModel, Member>();
            CreateMap<MemberDetailsViewModel, MemberDetails>();
            CreateMap<MemberAddressViewModel, MemberAddress>();
        }
    }
}
