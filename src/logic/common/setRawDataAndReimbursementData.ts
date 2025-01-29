import * as d3 from "d3";


// gets all the rows in the csv file and also creates s subset dataset that only includes the rows with expenses and stores both of these using setter params
export async function setRawDataAndReimbursementData(setData: (arg0: d3.DSVRowArray<string>) => void, setReimbursementData: (arg0: d3.DSVRowArray<string>) => void){

     // Load the CSV file and update the state with the data
     const rawData = await getRawCSVData();

     // Check if rawData is an array and has the 'columns' property
     if (Array.isArray(rawData) && "columns" in rawData) {
       setData(rawData); 
   
     // set reimbursement data
     const reimbursementData = filterDataSet(rawData)
      setReimbursementData(reimbursementData);
    }
  }

// gets all the rows in the csv file and stores it using a setter params
export async function setRawData(setData: (arg0: d3.DSVRowArray<string>) => void){

  // Load the CSV file and update the state with the data
  const rawData = await getRawCSVData();

  // Check if rawData is an array and has the 'columns' property
  if (Array.isArray(rawData) && "columns" in rawData) {
    setData(rawData); 

}
}
// helper function that returns a raw csv file
async function getRawCSVData(){
  // Load the CSV file and update the state with the data
    const url = "/dataset/fake_society_data.csv"
    //const url = "/dataset/cheque_req_requests.csv"
    return d3.csv(url).catch((error) => {
      console.error("Error loading the CSV file:", error);
    });
}
// filters through rows of data and only only keeps expenses and removes negative signs from the expense amount
export function filterDataSet(rawData: d3.DSVRowArray<string>){
  const filteredData = rawData
  .filter((row) =>  !row["Requester"]?.includes("Core Addition") &&
  !row["Requester"]?.includes("Core Allocation")) 
  .map((row) => {
    const newRow = { ...row };
    newRow["Amount"] = String(newRow["Amount"])?.replace(/-|\s|\$/g, "") || ""; 
    return newRow;
  }) as d3.DSVRowArray<string>;
  return filteredData;
}


