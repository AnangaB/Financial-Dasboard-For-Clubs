"use client";
import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Home() {
  const [data, setData] = useState<d3.DSVRowArray<string> | null>(null);

  useEffect(() => {
    // Load the CSV file and update the state with the data
    d3.csv("/dataset/fake_society_data.csv")
      .then((loadedData) => {
        setData(loadedData);
        console.log(loadedData);
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }, []);
  return (
    <div className="min-h-screen ">
      <p className=" text-center text-xl">Student Society Data Visualization</p>
    </div>
  );
}
