using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using SimERP.Business;
using Microsoft.AspNetCore.Mvc;
using SimERP.Business.Utils;
using System.Dynamic;

namespace SimERP.Controllers
{
    public class BaseController : Controller
    {
        #region Variables
            protected ResponeResult responeResult;
            protected string LangID = "vi-VN";
            protected string ControllerName = string.Empty;
            private string[] VietNamChar = new string[]
            {
                "aAeEoOuUiIdDyY",
                "áàạảãâấầậẩẫăắằặẳẵ",
                "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
                "éèẹẻẽêếềệểễ",
                "ÉÈẸẺẼÊẾỀỆỂỄ",
                "óòọỏõôốồộổỗơớờợởỡ",
                "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
                "úùụủũưứừựửữ",
                "ÚÙỤỦŨƯỨỪỰỬỮ",
                "íìịỉĩ",
                "ÍÌỊỈĨ",
                "đ",
                "Đ",
                "ýỳỵỷỹ",
                "ÝỲỴỶỸ"
           };
        #endregion

        #region Protected methods
            protected string ReplaceUnicode(string strInput)
            {
                if (string.IsNullOrEmpty(strInput))
                    return string.Empty;
                for (int i = 1; i < VietNamChar.Length; i++)
                {
                    for (int j = 0; j < VietNamChar[i].Length; j++)
                    {
                        strInput = strInput.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
                    }
                }
                return strInput.ToLower();
            }
        #endregion

        #region Public methods
        public ResponeResult CheckSign(object reqData, string clientUserName, string clientPasswordHash, string clientSign)
        {
            try
            {
                ResponeResult repData = new ResponeResult();
                if(reqData==null)
                {
                    repData.IsOk = false;
                    repData.MessageCode = MsgCodeConst.Msg_RequestDataInvalid;
                    repData.MessageText = MsgCodeConst.Msg_RequestDataInvalidText;
                    Logger.Error(" *******reqData data is null********");
                    return repData;
                }

                //Check security call API from Client
                int isCheckSign = int.Parse(ConfigurationManager.AppSettings["IsCheckSign"].ToString());
                if (isCheckSign == 0)
                {
                    //For Development Environment 
                    return repData;
                }

                //Server infor
                string serverUserName = ConfigurationManager.AppSettings["API_UserName"];
                string serverPassword = ConfigurationManager.AppSettings["API_Password"];
                string serverSecretKey = ConfigurationManager.AppSettings["API_SecretKey"];
                string serverSignKey = ConfigurationManager.AppSettings["API_SignKey"];

                //Mật mã đã mã hóa (SHA1 - lowercase): Password + SecretKey
                //string serverPasswordHash = System.Security.Cryptography.SHA1Hash(serverPassword + serverSecretKey).ToLower();

                //Kiểm tra tài khoản
                if (clientUserName != serverUserName || clientPasswordHash != serverPassword)
                {
                    repData.IsOk = false;
                    repData.MessageCode = MsgCodeConst.Msg_SignInvalid;
                    repData.MessageText = MsgCodeConst.Msg_SignInvalidText;
                    Logger.Error("*******Check sign is invalid********");
                    return repData;
                }

                return repData;
            }
            catch (Exception ex)
            {
                Logger.Error("*******Check sign is invalid********", ex);
                return null;
            }

        }
        public ResponeResult CreateResponeResult(string messageCode, string messageText = "", string messageError = "", dynamic repData = null)
        {
            var reval = new ResponeResult();
            reval.IsOk = false;
            reval.MessageCode = messageCode;    //Mã thông báo
            reval.MessageText = messageText;    //Nội dung thông báo hiển thị lên ứng dụng cho người dùng
            reval.MessageError = messageError;  // Nội dung thông báo lỗi phục vụ cho dev (ko hiển thị lên cho người dùng)
            reval.RepData = repData ?? new ExpandoObject(); //Dữ liệu trả về nếu có, ngược lại thì gán new {}
            return reval;
        }
        public ResponeResult CreateResponeResultError(string messageCode, string messageText = "", string messageError = "", dynamic repData = null)
        {
            var reval = new ResponeResult();
            reval.IsOk = false;
            reval.MessageCode = messageCode;    //Mã thông báo
            reval.MessageText = messageText;    //Nội dung thông báo hiển thị lên ứng dụng cho người dùng
            reval.MessageError = messageError;  // Nội dung thông báo lỗi phục vụ cho dev (ko hiển thị lên cho người dùng)
            reval.RepData = repData ?? new ExpandoObject(); //Dữ liệu trả về nếu có, ngược lại thì gán new {}
            return reval;
        }
        public void AddResponeError(ref ResponeResult repData, string messageCode = "", string messageText = "", string messageError = "")
        {
            repData.IsOk = false;
            repData.MessageCode = messageCode;
            repData.MessageText = messageText;
            repData.MessageError = messageError;
        }
        #endregion
    }
}