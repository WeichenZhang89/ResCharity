import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTransactionData } from "@/hooks/useTransactionData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 改进日期验证函数
const isValidDate = (timestamp) => {
  // 检查是否是数字型时间戳
  if (typeof timestamp === "number") {
    return !isNaN(new Date(timestamp).getTime());
  }
  // 检查是否是字符串型时间戳
  if (typeof timestamp === "string") {
    return !isNaN(Date.parse(timestamp));
  }
  return false;
};

const DonationChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const { fetchTransactions } = useTransactionData();

  useEffect(() => {
    const processTransactions = async () => {
      const transactions = await fetchTransactions();

      // 使用数组索引作为序列号
      let runningTotal = 0;
      const processedData = transactions.map((tx, index) => {
        const amount = parseInt(tx.transaction.value.outputs[0].amount);
        runningTotal += amount;

        // 使用序号代替日期
        const formattedDate = `Transaction ${index + 1}`;
        // 或者使用交易ID的前几位
        // const formattedDate = tx.transaction.value.id.substring(0, 8);

        return {
          date: formattedDate,
          total: runningTotal,
        };
      });

      setChartData({
        labels: processedData.map((item) => item.date),
        datasets: [
          {
            label: "Total Donations",
            data: processedData.map((item) => item.total),
            fill: true,
            borderColor: "#15c8a0",
            backgroundColor: "rgba(21, 200, 160, 0.1)",
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#15c8a0",
            pointBorderWidth: 2,
          },
        ],
      });
    };

    processTransactions();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        bodySpacing: 4,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div
      className="donation-chart-container"
      style={{ height: "400px", marginTop: "30px" }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DonationChart;
