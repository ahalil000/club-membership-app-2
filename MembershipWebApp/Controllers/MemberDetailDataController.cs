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
    public class MemberDetailDataController : Controller
    {

        private readonly IMembershipDetailDataRequest _memberdetailrequest;
        private readonly IMapper _objectmapper;

        public MemberDetailDataController(
            IMembershipDetailDataRequest memberdetailrequest,
            IMapper objectmapper)
        {
            _memberdetailrequest = memberdetailrequest;
            _objectmapper = objectmapper;
        }

        #region RESTful Conventions
        /// <summary>
        /// GET: api/MemberDetailData
        /// </summary>
        /// <returns>Nothing: this method will raise a NotFound HTTP exception, since we're not supporting this API call.</returns>
        [HttpGet()]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }

        /// <summary>
        /// GET: api/MemberDetailData/{id}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>A Json-serialized object representing a single item.</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            MemberDetails memberdetails = _memberdetailrequest.GetMemberDetailEntry(id);
            if (memberdetails != null)
            {
                return new JsonResult(_objectmapper.Map<MemberDetailsViewModel>(memberdetails), DefaultJsonSettings);
            }
            else
            {
                return NotFound(new { Error = String.Format("Member Details ID {0} has not been found", id) });
            }
        }


        /// <summary>
        /// GET: api/MemberData/List
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>A Json-serialized object representing a single item.</returns>
        [Route("List")]
        public IActionResult List()
        {
            return NotFound(new { Error = "not found" });

            //List<Member> memberlist = _memberrequest.GetList();
            //return new JsonResult(memberlist, DefaultJsonSettings);
        }


        /// <summary>
        /// POST: api/items
        /// </summary>
        /// <returns>Creates a new Member and return it accordingly.</returns>
        [HttpPost()]
        [Authorize]
        public IActionResult Add([FromBody]MemberDetailsViewModel mvm)
        {
            if (mvm != null)
            {
                // create a new Item with the client-sent json data
                var item = _objectmapper.Map<MemberDetailsViewModel>(mvm);
                string daysofweekselections = _memberdetailrequest.SetDaysOfWeekTextFromDaysOfWeekSelections(mvm.DaysOfWeekAttendSelected);

                // add the new item
                _memberdetailrequest.AddNewMemberDetailEntry(
                    mvm.MemberID,
                    mvm.ReceiveNewsLetter,
                    daysofweekselections,
                    mvm.DateJoined,
                    mvm.MemberLevel,
                    mvm.MemberFee,
                    mvm.RenewalReminderDate,
                    mvm.IsMemberFeePaid
                );

                // return the newly-created Item to the client.
                return new JsonResult(_objectmapper.Map<MemberViewModel>(mvm), DefaultJsonSettings);
            }

            // return a generic HTTP Status 500 (Not Found) if the client payload is invalid.
            return new StatusCodeResult(500);
        }

        /// <summary>
        /// PUT: api/items/{id}
        /// </summary>
        /// <returns>Updates an existing Member and return it accordingly.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody]MemberDetailsViewModel mvm)
        {
            if ((ModelState.IsValid) && (mvm != null))
            {
                DateTime dtdjLocal = mvm.DateJoined.ToLocalTime();
                DateTime dtrnLocal = mvm.RenewalReminderDate.ToLocalTime();
                string daysofweekselections = _memberdetailrequest.SetDaysOfWeekTextFromDaysOfWeekSelections(mvm.DaysOfWeekAttendSelected);
                _memberdetailrequest.EditMemberDetailEntry(
                    id,
                    mvm.MemberID,
                    mvm.ReceiveNewsLetter,
                    daysofweekselections,
                    mvm.DateJoined,
                    mvm.MemberLevel,
                    mvm.MemberFee,
                    mvm.RenewalReminderDate,
                    mvm.IsMemberFeePaid);

                // return the updated Item to the client.
                return new JsonResult(_objectmapper.Map<MemberDetailsViewModel>(mvm), DefaultJsonSettings);
            }
            else
            {
                // return a HTTP Status 404 (Not Found) if we couldn't find a suitable Member.
                return NotFound(new { Error = String.Format("Member Details ID {0} has not been found", id) });
            }
        }


        /// <summary>
        /// DELETE: api/items/{id}
        /// </summary>
        /// <returns>Deletes a Member, returning a HTTP status 200 (ok) when done.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            MemberDetails memberdetails = _memberdetailrequest.GetMemberDetailEntry(id);
            if (memberdetails != null)
            {
                // remove the item to delete from the DbContext.
                _memberdetailrequest.DeleteMemberDetailEntry(id);

                // return an HTTP Status 200 (OK).
                return new OkResult();
            }

            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable Member.
            return NotFound(new { Error = String.Format("Member Details ID {0} has not been found", id) });
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
