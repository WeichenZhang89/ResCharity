import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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

// 添加日期验证辅助函数
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const DonationChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const { fetchTransactions } = useTransactionData();

  useEffect(() => {
    const processTransactions = async () => {
      const transactions = await fetchTransactions();
      
      // 按日期排序交易
      const sortedTransactions = transactions.sort((a, b) => {
        const dateA = new Date(a.transaction.value.timestamp);
        const dateB = new Date(b.transaction.value.timestamp);
        return dateA - dateB;
      });

      // 处理数据以创建累计总额
      let runningTotal = 0;
      const processedData = sortedTransactions.map(tx => {
        const amount = parseInt(tx.transaction.value.outputs[0].amount);
        runningTotal += amount;
        
        // 格式化日期
        const date = new Date(tx.transaction.value.timestamp);
        const formattedDate = isValidDate(date) 
          ? date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          : 'Invalid Date';

        return {
          date: formattedDate,
          total: runningTotal
        };
      });

      // 准备图表数据
      const labels = processedData.map(item => item.date);
      const data = processedData.map(item => item.total);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Total Donations',
            data: data,
            fill: true,
            borderColor: '#15c8a0',
            backgroundColor: 'rgba(21, 200, 160, 0.1)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#15c8a0',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          }
        ]
      });
    };

    processTransactions();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        bodySpacing: 4,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="donation-chart-container" style={{ height: '400px', marginTop: '30px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DonationChart; 
