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
import { getRunningPaymentAmount } from "@/logic/graphs/line graphs/getRunningTotalColumn";

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
  
  const runningMoneyValue: number[] = getRunningPaymentAmount(
    data.map((row) => {
      return parseFloat(row[moneyColumn]?.replaceAll(/\$|\s/g, ""));
    })
  );
  console.log("runningMoneyValue", runningMoneyValue);
  // Extract labels and dtaa for the chart
  const labels = runningMoneyValue.map((value, i: number) => i);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        data: runningMoneyValue,
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
