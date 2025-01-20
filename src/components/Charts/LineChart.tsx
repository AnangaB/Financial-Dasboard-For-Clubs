import React from "react";
import * as d3 from "d3";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  data: d3.DSVRowArray<string>;
  moneyColumn: string;
  title: string;
};

export default function LineChart({
  data,
  moneyColumn,
  title,
}: LineChartProps) {
  const moneyData: number[] = data.map((row) => {
    return Number(row[moneyColumn]?.replace(/\$/g, "")) || 0;
  });

  // Extract labels and data for the chart
  const labels = moneyData.map((value, i: number) => i);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        data: moneyData,
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
      <Line data={dataForChart} options={options} />
    </div>
  );
}
