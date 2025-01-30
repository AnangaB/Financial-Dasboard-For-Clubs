"use client";

import BarChart from "@/components/Charts/BarChart";
import CoreBalanceLineChart from "@/components/Charts/CoreBalanceLineChart";
import PieChart from "@/components/Charts/pieChart";
import Navbar from "@/components/common/Navbar/Navbar";
import SemesterBar from "@/components/common/SemesterBar";
import { getUniqueSemesterList } from "@/logic/common/Dataset Operations/getSemestersList";
import { getDataSetForSemester } from "@/logic/common/Dataset Operations/getSemesterSpecificDataset";
import {
  filterDataSet,
  setRawDataAndReimbursementData,
} from "@/logic/common/setRawDataAndReimbursementData";
import d3 from "d3";
import { useEffect, useState } from "react";

export default function Home() {
  //the full datasets, contains info for all the semesters
  const [allData, setAllData] = useState<d3.DSVRowArray<string> | null>(null);
  const [allReimbursementData, setAllReimbursementData] =
    useState<d3.DSVRowArray<string> | null>(null);

  const [semesterList, setSemesterList] = useState<string[]>([]);
  const [activeSemester, setActiveSemester] = useState<string>("Overall");

  const [displayData, setDisplayData] = useState<d3.DSVRowArray<string> | null>(
    null
  );
  const [displayReimbursementData, setDisplayReimbursementData] =
    useState<d3.DSVRowArray<string> | null>(null);

  useEffect(() => {
    setRawDataAndReimbursementData(setAllData, setAllReimbursementData);
  }, []);

  //get unique list of semesters used in data, once data is loaded
  useEffect(() => {
    if (allData) {
      setSemesterList(["Overall", ...getUniqueSemesterList(allData)]);
      setDisplayData(allData);
      setDisplayReimbursementData(allReimbursementData);
    }
  }, [allData, allReimbursementData]);

  //
  useEffect(() => {
    if (allData) {
      const newDisplayData = getDataSetForSemester(allData, activeSemester);
      const newDisplayReimbursementDat = filterDataSet(newDisplayData);

      setDisplayData(newDisplayData);
      setDisplayReimbursementData(newDisplayReimbursementDat);
    }
  }, [activeSemester, allData]);

  return (
    <div className="min-h-screen h-full ">
      <Navbar active="Home" />
      {semesterList && semesterList.length > 1 && (
        <SemesterBar
          activeSemester={activeSemester}
          setActiveSemester={setActiveSemester}
          semesterList={semesterList}
        />
      )}

      {allData && displayData && displayReimbursementData && (
        <div className="flex justify-between flex-wrap items-center p-1">
          <div className="w-full p-1">
            <CoreBalanceLineChart
              data={allData}
              moneyColumn={"Amount"}
              title={`Changes in Core Balance${
                activeSemester && activeSemester != "Overall"
                  ? " for " + activeSemester
                  : ""
              }`}
              semester={activeSemester}
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <BarChart
              data={displayReimbursementData}
              groupByColumnName="Fund Type"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Core, Grant and Trust"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={displayReimbursementData}
              groupByColumnName="Spending Category"
              columnToSum="Amount"
              title="Total Reimbursements grouped by Fund Category"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-1">
            <PieChart
              data={displayReimbursementData}
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
