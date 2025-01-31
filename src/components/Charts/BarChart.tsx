import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import * as d3 from "d3";
import { colors } from "@/type/common/chartColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type BarChartProps = {
  data: d3.DSVRowArray<string>;
  groupByColumnName: string;
  columnToSum: string;
  title: string;
};

export default function BarChart({
  data,
  groupByColumnName,
  columnToSum,
  title,
}: BarChartProps) {
  const groupedData = d3.rollups(
    data,

    (group) => d3.sum(group, (d) => parseFloat(d[columnToSum]) || 0),
    (d) => d[groupByColumnName]
  );
  // Extract labels and data for the chart
  const labels = groupedData.map(([key]) => key);
  const dataValues = groupedData.map((d) => d[1]);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: "Funds Spent",
        data: dataValues,
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };
  return (
    <div className="h-screen max-h-[60vh]">
      <Bar data={dataForChart} options={options} />
    </div>
  );
}
