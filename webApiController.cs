using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Responses;
using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers.Api
{   [RoutePrefix("api/Equipment")]
    public class EquipmentApiController : ApiController
    {
        EquipmentService _svc;

        public EquipmentApiController(EquipmentService svc)
        {
            _svc = svc;
        }

        [HttpGet]
        [Route] 
        public HttpResponseMessage Select()
        {
            if (!ModelState.IsValid)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemsResponse<Equipment> response = new ItemsResponse<Equipment>();
            response.Items = _svc.Select();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpGet]
        [Route("{id}")] 
        public HttpResponseMessage SelectById(int id)
        {
            if (!ModelState.IsValid)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<Equipment> response = new ItemResponse<Equipment>();
            response.Item = _svc.SelectById(id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPost]
        [Route] 
        public HttpResponseMessage Insert(EquipmentAddRequest model)
        {
            if (!ModelState.IsValid)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _svc.Insert(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(EquipmentUpdateRequest model)
        {
            if (!ModelState.IsValid)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> response = new ItemResponse<int>();
               response.Item = _svc.Update(model);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            if (!ModelState.IsValid)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _svc.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
    }
}
