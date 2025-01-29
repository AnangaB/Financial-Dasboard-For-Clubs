"use client";

import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/pieChart";
import Navbar from "@/components/common/Navbar/Navbar";
import SemesterBar from "@/components/common/SemesterBar";
import { setRawDataAndReimbursementData } from "@/logic/common/setRawDataAndReimbursementData";
import d3 from "d3";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [reimbursementData, setReimbursementData] =
    useState<d3.DSVRowArray<string> | null>(null);

  useEffect(() => {
    setRawDataAndReimbursementData(setData, setReimbursementData);
  }, []);
  return (
    <div className="min-h-screen h-full ">
      <Navbar active="Home" />
      <SemesterBar
        activeSemester={"Fall 2024"}
        semesterList={["Fall 2024", "Spring 2025"]}
      />
      {data && reimbursementData && (
        <div className="flex justify-between flex-wrap items-center p-1">
          <div className="w-full p-1">
            <LineChart
              data={data}
              moneyColumn={"Amount"}
              title="Core Balance Changes"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <BarChart
              data={reimbursementData}
              groupByColumnName="Fund Type"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Core, Grant and Trust"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={reimbursementData}
              groupByColumnName="Spending Category"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Fund Category"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={reimbursementData}
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
