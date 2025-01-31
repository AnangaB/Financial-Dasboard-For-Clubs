import React, { useEffect, useState } from "react";
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
import { getRunningCoreBalance } from "@/logic/graphs/line graphs/getRunningTotalValues";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type CoreBalanceLineChartProps = {
  data: d3.DSVRowArray<string>;
  moneyColumn: string;
  title: string;
  semester: string;
};

export default function CoreBalanceLineChart({
  data,
  moneyColumn,
  title,
  semester,
}: CoreBalanceLineChartProps) {
  const [runningMoneyValues, setRunningMoneyValues] = useState<number[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]);
  const [tooltipLabels, setTooltipLabels] = useState<string[]>([]);

  useEffect(() => {
    const fullRunningMoneyValue: number[] = getRunningCoreBalance(
      data.map((row) => {
        return parseFloat(row[moneyColumn]?.replaceAll(/\$|\s/g, ""));
      }),
      data.map((row) => String(row["Fund Type"]))
    );

    const startIndex: number =
      semester == "Overall"
        ? 0
        : Math.max(
            data.findIndex((row) => row["Semester"] === semester),
            0
          );

    const endIndex: number =
      semester === "Overall"
        ? data.length
        : Math.min(
            data.findIndex(
              (row, i) => i > startIndex && row["Semester"] !== semester
            ),
            data.length
          );

    // If no new semester is found, set endIndex to the length of the array
    const finalEndIndex = endIndex === -1 ? data.length : endIndex;

    const splicedRunningMoneyValue: number[] = fullRunningMoneyValue.slice(
      startIndex,
      finalEndIndex
    );
    setRunningMoneyValues(splicedRunningMoneyValue);
    console.log(splicedRunningMoneyValue, fullRunningMoneyValue);

    setXAxisLabels(
      data
        .map((row) => String(row["Requester"]))
        .slice(startIndex, finalEndIndex)
    );

    // Tooltip labels
    setTooltipLabels(
      data
        .map(
          (row) =>
            `${row["Requester"]}: $${row["Amount"]} (${row["Spending Category"]} - ${row["Fund Type"]} -  ${row["Semester"]})`
        )
        .slice(startIndex, finalEndIndex)
    );
  }, [semester, data, moneyColumn]);

  const dataForChart = {
    labels: xAxisLabels,
    datasets: [
      {
        data: runningMoneyValues,
        radius: 8,
        hoverRadius: 15,
        borderColor: "#32527b",
        backgroundColor: "#32527b",
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
          size: 20,
          weight: "normal" as const,
        },
        color: "black",
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
