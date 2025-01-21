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
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getRunningCoreBalance } from "@/logic/graphs/line graphs/getRunningTotalColumn";

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
  const runningMoneyValue: number[] = getRunningCoreBalance(
    data.map((row) => {
      return parseFloat(row[moneyColumn]?.replaceAll(/\$|\s/g, ""));
    })
  );
  console.log("runningMoneyValue", runningMoneyValue);
  console.log("data", data);

  // Labels for x-axis
  const xAxisLabels = data.map((row) => String(row["Requester"]));

  // Tooltip labels
  const tooltipLabels = data.map(
    (row) =>
      `${row["Requester"]}: $${row["Amount"]} (${row["Spending Category"]})`
  );

  const dataForChart = {
    labels: xAxisLabels,
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
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"line">) => {
            return tooltipLabels[tooltipItem.dataIndex];
          },
        },
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
