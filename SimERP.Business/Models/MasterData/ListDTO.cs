using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SimERP.Business.Models.RequestData;

namespace SimERP.Business.Models.MasterData.ListDTO
{
    public class Tax : SimERP.Data.Tax
    {
        public string UserName { get; set; }
    }

    public class TaxSearchParams
    {
        public AuthenParams authenParams { get; set; }
        public string searchString { get; set; }
        public int startRow { get; set; } = 0;
        public int maxRow { get; set; } = 10;

    }

    public class DelTaxParams
    {
        public AuthenParams authenParams { get; set; }
        public int id { get; set; }

    }

    public class AddTaxParams
    {
        public AuthenParams authenParams { get; set; }
        public Tax tax { get; set; }
        public bool isNew { get; set; }

    }
}
