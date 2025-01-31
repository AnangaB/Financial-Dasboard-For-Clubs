import { Columns } from "antd";
/** Given a data set, converts into format needed for a antd Table. Allows ascending/descending sorting for the "Amount" Column, and unique value filtering for some other rows.
 * 
 * @param data a data set
 * @returns list of type Columns, to be used in a antd table
 */
export function getDataTableColumns(data:d3.DSVRowArray<string>){
    
   return data.columns.map((col) => {
          if (col == "Amount") {
            return {
              title: col,
              dataIndex: col,
              key: col,
              sorter: (a: Record<string, string>, b: Record<string, string>) =>
                parseFloat(a[col] || "0") - parseFloat(b[col] || "0"),
              sortDirections: ["descend", "ascend"],
            };
          } else if (
            [
              "Requester",
              "Semester",
              "Fund Type",
              "Grant ID",
              "Grant Name",
              "Spending Category",
              "Minutes File",
            ].includes(col)
          ) {
            // Filter logic for other columns
            const uniqueValues = Array.from(
              new Set(data.map((row) => row[col] || ""))
            );
  
            return {
              title: col,
              dataIndex: col,
              key: col,
              filterMode: "tree",
              filterSearch: true,
              filters: uniqueValues.map((value) => ({ text: value, value })),
              onFilter: (value: string, record: { [x: string]: string }) =>
                String(record[col]).includes(value as string),
            };
          }
  
          return {
            title: col,
            dataIndex: col,
            key: col,
          };
        }) as Columns;
      }