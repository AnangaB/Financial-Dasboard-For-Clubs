"use client";
import Navbar from "@/components/common/Navbar/Navbar";
import { setRawData } from "@/logic/common/setRawDataAndReimbursementData";
import { Columns, Table } from "antd";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [column, setColumns] = useState<Columns>();

  useEffect(() => {
    setRawData(setData);
  }, []);

  // add a key field to data, so Table component doesn't output err about unique key
  const processedData = data
    ? data.map((row, index) => ({
        ...row,
        key: index,
      }))
    : [];

  useEffect(() => {
    const header = data?.columns.map((col) => ({
      title: col,
      dataIndex: col,
      key: col,
    })) as Columns;
    setColumns(header);
  }, [data]);

  return (
    <div className="min-h-screen w-full">
      <Navbar active="Data Table" />
      <h1 className="text-center text-2xl mt-1">Data Table</h1>
      <div className="overflow-scroll">
        {processedData.length > 0 && column && (
          <Table dataSource={processedData} columns={column as Columns} />
        )}
      </div>
    </div>
  );
}
