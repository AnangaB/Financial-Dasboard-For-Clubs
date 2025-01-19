"use client";

import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/pieChart";
import Navbar from "@/components/Navbar/Navbar";
import { setDataAndColumns } from "@/logic/common/getRawData";
import { TableColumns } from "@/type/common/DataTableTypes";
import d3 from "d3";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [columns, setColumns] = useState<TableColumns[]>([]);

  useEffect(() => {
    setDataAndColumns(setData, setColumns);
    console.log(columns);
  }, []);

  return (
    <div className="min-h-screen h-full ">
      <Navbar active="Home" />
      {data && (
        <div className="flex justify-between flex-wrap items-center p-1">
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <BarChart
              data={data}
              groupByColumnName="Fund Type"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Core, Grant and Trust"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={data}
              groupByColumnName="Spending Category"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Fund Category"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={data}
              groupByColumnName="Requester"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Requester"
            />
          </div>
        </div>
      )}
    </div>
  );
}
