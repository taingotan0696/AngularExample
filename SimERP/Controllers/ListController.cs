using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimERP.Business;
using SimERP.Business.Models;
using SimERP.Business.Models.MasterData.ListDTO;
using SimERP.Business.Models.RequestData;
using SimERP.Business.Utils;

namespace SimERP.Controllers
{

    public class ListController : BaseController
    {
        #region Variables
        ITax taxBO;
        IUnit unitBO;
        #endregion

        #region Contructor
        public ListController()
        {
            this.ControllerName = "List";
            this.taxBO = this.taxBO ?? new TaxBO();
            this.unitBO = this.unitBO ?? new UnitBO();
        }
        #endregion

        #region Tax

        [HttpPost("[action]")]
        [Route("api/list/tax")]
        public ResponeResult GetTaxData([FromBody]TaxSearchParams objTaxSearchParams)
        {
            try
            { //Check security & data request
                var repData = this.CheckSign(objTaxSearchParams.authenParams, objTaxSearchParams.authenParams.ClientUserName, objTaxSearchParams.authenParams.ClientPassword, objTaxSearchParams.authenParams.Sign);
                if (repData == null || !repData.IsOk)
                    return repData;
                var dataResult = taxBO.GetData(ReplaceUnicode(objTaxSearchParams.searchString), objTaxSearchParams.startRow, objTaxSearchParams.maxRow);
                if (dataResult != null)
                {
                    repData.RepData = dataResult;
                    repData.TotalRow = this.taxBO.TotalRows;
                }
                else
                    this.AddResponeError(ref repData, taxBO.getMsgCode(), taxBO.GetMessage(this.taxBO.getMsgCode(), this.LangID));

                return repData;
            }
            catch (Exception ex)
            {
                this.responeResult = this.CreateResponeResultError(MsgCodeConst.Msg_RequestDataInvalid, MsgCodeConst.Msg_RequestDataInvalidText, ex.Message, null);
                Logger.Error("EXCEPTION-CALL API", ex);
                return responeResult;
            }
        }

        [HttpPost]
        [Route("api/list/savetax")]
        public ActionResult<ResponeResult> SaveTax([FromBody]AddTaxParams objAddTaxParams)
        {
            try
            {
                //Check security & data request
                var repData = this.CheckSign(objAddTaxParams.authenParams, objAddTaxParams.authenParams.ClientUserName, objAddTaxParams.authenParams.ClientPassword, objAddTaxParams.authenParams.Sign);
                if (repData == null || !repData.IsOk)
                    return repData;

                var dataResult = taxBO.Save(objAddTaxParams.tax, objAddTaxParams.isNew);
                if (dataResult)
                    repData.RepData = dataResult;
                else
                    this.AddResponeError(ref repData, taxBO.getMsgCode(), taxBO.GetMessage(this.taxBO.getMsgCode(), this.LangID));

                return repData;
            }
            catch (Exception ex)
            {
                this.responeResult = this.CreateResponeResultError(MsgCodeConst.Msg_RequestDataInvalid, MsgCodeConst.Msg_RequestDataInvalidText, ex.Message, null);
                Logger.Error("EXCEPTION-CALL API", ex);
                return responeResult;
            }
        }

        [HttpPost]
        [Route("api/list/deletetax")]
        public ActionResult<ResponeResult> DeleteTax([FromBody]DelTaxParams delTaxParams)
        {
            try
            {
                //Check security & data request
                var repData = this.CheckSign(delTaxParams.authenParams, delTaxParams.authenParams.ClientUserName, delTaxParams.authenParams.ClientPassword, delTaxParams.authenParams.Sign);
                if (repData == null || !repData.IsOk)
                    return repData;

                var dataResult = taxBO.DeleteTax(delTaxParams.id);
                if (dataResult)
                    repData.RepData = dataResult;
                else
                    this.AddResponeError(ref repData, taxBO.getMsgCode(), taxBO.GetMessage(this.taxBO.getMsgCode(), this.LangID));

                return repData;
            }
            catch (Exception ex)
            {
                this.responeResult = this.CreateResponeResultError(MsgCodeConst.Msg_RequestDataInvalid, MsgCodeConst.Msg_RequestDataInvalidText, ex.Message, null);
                Logger.Error("EXCEPTION-CALL API", ex);
                return responeResult;
            }
        }
        #endregion

        #region Unint 

        [HttpPost("[action]")]
        [Route("api/list/unit")]
        public ResponeResult GetUnitData([FromBody]TaxSearchParams objUnitSearchParams)
        {
            try
            { //Check security & data request
                var repData = this.CheckSign(objUnitSearchParams.authenParams, objUnitSearchParams.authenParams.ClientUserName, objUnitSearchParams.authenParams.ClientPassword, objUnitSearchParams.authenParams.Sign);
                if (repData == null || !repData.IsOk)
                    return repData;
                var dataResult = unitBO.GetData(ReplaceUnicode(objUnitSearchParams.searchString), objUnitSearchParams.startRow, objUnitSearchParams.maxRow);
                if (dataResult != null)
                {
                    repData.RepData = dataResult;
                    repData.TotalRow = this.unitBO.TotalRows;
                }
                else
                    this.AddResponeError(ref repData, unitBO.getMsgCode(), unitBO.GetMessage(this.unitBO.getMsgCode(), this.LangID));

                return repData;
            }
            catch (Exception ex)
            {
                this.responeResult = this.CreateResponeResultError(MsgCodeConst.Msg_RequestDataInvalid, MsgCodeConst.Msg_RequestDataInvalidText, ex.Message, null);
                Logger.Error("EXCEPTION-CALL API", ex);
                return responeResult;
            }
        }

        [HttpPost]
        [Route("api/list/deleteunit")]
        public ActionResult<ResponeResult> DeleteUnit([FromBody]DelTaxParams delunitParams)
        {
            try
            {
                //Check security & data request
                var repData = this.CheckSign(delunitParams.authenParams, delunitParams.authenParams.ClientUserName, delunitParams.authenParams.ClientPassword, delunitParams.authenParams.Sign);
                if (repData == null || !repData.IsOk)
                    return repData;

                var dataResult = unitBO.DeleteUnit(delunitParams.id);
                if (dataResult)
                    repData.RepData = dataResult;
                else
                    this.AddResponeError(ref repData, unitBO.getMsgCode(), unitBO.GetMessage(this.unitBO.getMsgCode(), this.LangID));

                return repData;
            }
            catch (Exception ex)
            {
                this.responeResult = this.CreateResponeResultError(MsgCodeConst.Msg_RequestDataInvalid, MsgCodeConst.Msg_RequestDataInvalidText, ex.Message, null);
                Logger.Error("EXCEPTION-CALL API", ex);
                return responeResult;
            }
        }

        #endregion
    }
}