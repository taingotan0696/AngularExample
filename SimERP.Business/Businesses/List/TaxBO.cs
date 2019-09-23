﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using SimERP.Data;

namespace SimERP.Business
{
    public class TaxBO:Repository<Tax>, ITax
    {
        #region Public methods
            public List<Models.MasterData.ListDTO.Tax> GetData(string searchString, int startRow, int maxRows)
            {
                try
                {
                    using (IDbConnection conn = IConnect.GetOpenConnection())
                    {
                        string sqlWhere = string.Empty;
                        DynamicParameters param = new DynamicParameters();

                        if (!string.IsNullOrEmpty(searchString))
                        {
                            sqlWhere += " WHERE t.SearchString Like @SearchString";
                            param.Add("SearchString", "%" + searchString+ "%");
                        }
                        string sqlQuery = @" SELECT Count(1) FROM  [item].[Tax] t with(nolock) " + sqlWhere +
                                          @";SELECT t.*, u.FullName as UserName FROM [item].[Tax] t with(nolock) LEFT JOIN acc.[User] u with(nolock) on u.UserID = t.CreatedBy
                                          " + sqlWhere + " ORDER BY t.SortOrder OFFSET " + startRow + " ROWS FETCH NEXT " + maxRows + " ROWS ONLY";

                        using (var multiResult = conn.QueryMultiple(sqlQuery, param))
                        {
                            this.TotalRows = multiResult.Read<int>().Single();
                            return multiResult.Read<Models.MasterData.ListDTO.Tax>().ToList();
                        }
                    }
                }
                catch (Exception ex)
                {
                    this.AddMessage(MessageCode.MSGCODE_001, ex.Message);
                    Logger.Error(GetType(), ex);
                    return null;
                }
            }
            public bool Save(Tax tax, bool isNew)
            {
                try
                {
                    using (var db = new DBEntities())
                    {
                        if (isNew)
                        {
                            if (CheckExistCode(tax.TaxCode))
                            {
                                this.AddMessage("000004", "Mã code đã tồn tại, vui lòng chọn mã khác!");
                                return false;
                            }
                            db.Taxes.Add(tax);
                        }
                        else
                        {
                            db.Entry(tax).State = System.Data.Entity.EntityState.Modified;
                        }
                        db.SaveChanges();
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    this.AddMessage(MessageCode.MSGCODE_002, "Lưu không thành công: " + ex.Message);
                    Logger.Error(GetType(), ex);
                    return false;
                }
            }
            public bool DeleteTax(int id)
            {
                try
                {
                    using (var db = new DBEntities())
                    {
                        //TODO LIST: Kiểm tra sử dụng trước khi xóa
                        db.Taxes.Remove(db.Taxes.Find(id));
                        db.SaveChanges();
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    this.AddMessage(MessageCode.MSGCODE_003, "Delete tax unsucessfull");
                    Logger.Error(GetType(), ex);
                    return false;
                }
            }
        #endregion

        #region Private methods
            private bool CheckExistCode(string unitCode)
            {
                try
                {
                    using (var db = new DBEntities())
                    {
                        int count = 0;
                        count = db.Units.Where(m => m.UnitCode == unitCode).Count();
                        if (count > 0)
                            return true;
                        return false;
                    }
                }
                catch (Exception ex)

                {
                    this.AddMessage(MessageCode.MSGCODE_001, ex.Message);
                    Logger.Error(GetType(), ex);
                    return true;
                }
            }
        #endregion
    }
}
