import * as d3 from "d3";

export async function setDataAndColumns(setData: (arg0: d3.DSVRowArray<string>) => void, setColumns: (arg0: { title: string; dataIndex: string; key: string; }[]) => void, setReimbursementData: (arg0: d3.DSVRowArray<string>) => void){
     // Load the CSV file and update the state with the data
        d3.csv("/dataset/fake_society_data.csv")
          .then((loadedData) => {
            setData(loadedData);

            if (loadedData.columns) {

              const tableColumns = loadedData.columns.map((col) => ({
                title: col,
                dataIndex: col,
                key: col,
              }));
    
              setColumns(tableColumns);

    
            }

            console.log(loadedData);
            const filteredData = loadedData
            .filter((row) => row["Requester"] !== "Core Addition")
            .map((row) => {
              const newRow = { ...row };
              newRow["Amount"] = newRow["Amount"]?.replace(/-|\s|\$/g, "") || ""; 
              return newRow;
            }) as d3.DSVRowArray<string>;


            setReimbursementData(filteredData);
          })
          .catch((error) => {
            console.error("Error loading the CSV file:", error);
          });
}