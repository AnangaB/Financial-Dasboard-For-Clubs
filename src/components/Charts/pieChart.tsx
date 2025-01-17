import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Colors,
} from "chart.js";
import * as d3 from "d3";
ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

type PieChartProps = {
  data: d3.DSVRowArray<string>;
  groupByColumnName: string;
  columnToSum: string;
  title: string;
};

export default function PieChart({
  data,
  groupByColumnName,
  columnToSum,
  title,
}: PieChartProps) {
  const groupedData = d3.rollups(
    data,
    (group) =>
      d3.sum(
        group,
        (d) => parseFloat(d[columnToSum]?.replace(/\$/g, "") || "0") // remove dollar signs, and convert to number
      ),
    (d) => d[groupByColumnName]!
  );

  // Extract labels and data for the chart
  const labels = groupedData.map(([key]) => key);
  const dataset = groupedData.map(([, value]) => value);

  const dataForChart = {
    labels,
    datasets: [
      {
        data: dataset,

        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true, // Ensure the title is displayed
        text: title,
        font: {
          size: 18, // Adjust the font size of the title
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };
  return (
    <div className="w-1/2">
      <Pie data={dataForChart} options={options} />
    </div>
  );
}
