"use client";
import Navbar from "@/components/Navbar/Navbar";
import { setDataAndColumns } from "@/logic/common/getRawData";
import { TableColumns } from "@/type/common/DataTableTypes";
import { Columns, Table } from "antd";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [columns, setColumns] = useState<TableColumns[]>([]);
  useEffect(() => {
    setDataAndColumns(setData, setColumns);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <h1 className="text-center text-2xl">Data Table</h1>
      {data != null && <Table dataSource={data} columns={columns as Columns} />}
    </div>
  );
}
