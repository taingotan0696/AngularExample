using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SimERP.Data;
using SimERP.Data.DBEntities;

namespace SimERP.Business
{
    public interface IUnit: IRepository<Unit>
    {
        List<Unit> GetData(string searchString, int startRow, int maxRows);
        bool DeleteUnit(int id);
    }
}
