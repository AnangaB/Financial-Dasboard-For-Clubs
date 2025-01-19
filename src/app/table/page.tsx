"use client";
import Navbar from "@/components/Navbar/Navbar";
import { setDataAndColumns } from "@/logic/common/getRawData";
import { TableColumns } from "@/type/common/DataTableTypes";
import { Columns, Table } from "antd";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [columns, setColumns] = useState<TableColumns[]>([]);
  useEffect(() => {
    setDataAndColumns(setData, setColumns);
  }, []);

  // add a key field to data, so Table component doesn't output err about unique key
  const processedData = data
    ? data.map((row, index) => ({
        ...row,
        key: index,
      }))
    : [];

  return (
    <div className="min-h-screen w-full">
      <Navbar active="Data Table" />
      <h1 className="text-center text-2xl">Data Table</h1>
      <div className="overflow-scroll">
        {processedData.length > 0 && (
          <Table dataSource={processedData} columns={columns as Columns} />
        )}
      </div>
    </div>
  );
}
