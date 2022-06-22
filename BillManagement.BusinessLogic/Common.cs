using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillManagement.BusinessLogic
{
   public class Common
    {
        public string DataSetToStringWithTableName(DataSet ds)
        {
            Dictionary<string, object> ssvalue = new Dictionary<string, object>();

            foreach (DataTable table in ds.Tables)
            {
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (table.Rows.Count > 0)
                {
                    table.TableName = Convert.ToString(table.Rows[0]["TableName"]);
                    string tablename = table.TableName;
                    foreach (DataRow row in table.Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in table.Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }

                    ssvalue.Add(tablename, parentRow);
                }
            }

            // return jsSerializer.Serialize(ssvalue);
            return JsonConvert.SerializeObject(ssvalue);
        }

    }
}
