"use client";
import Navbar from "@/components/Navbar/Navbar";
import { Columns, Table } from "antd";
import * as d3 from "d3";
import { useEffect, useState } from "react";

type tableColumns = {
  title: string;
  dataIndex: string;
  key: string;
};
export default function AboutPage() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);
  const [columns, setColumns] = useState<tableColumns[]>([]);

  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <h1 className="text-center text-2xl">Data Table</h1>
      {data != null && <Table dataSource={data} columns={columns as Columns} />}
    </div>
  );
}
