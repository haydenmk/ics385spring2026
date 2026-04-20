import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ArrivalChart({ island, data }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No arrival data available.</p>;
  }

  const chartData = {
    labels: data.map((row) => row.month),
    datasets: [
      {
        label: `${island} Arrivals`,
        data: data.map((row) => row.arrivals),
        backgroundColor: "rgba(13, 59, 102, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: `${island} Visitor Arrivals`
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default ArrivalChart;