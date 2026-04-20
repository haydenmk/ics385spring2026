import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function OriginChart({ island, origin }) {
  const chartData = {
    labels: origin.labels,
    datasets: [
      {
        label: `${island} Visitor Origin`,
        data: origin.values,
        backgroundColor: [
          "#0d3b66",
          "#f4a261",
          "#2a9d8f",
          "#a8dadc"
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: `${island} Visitor Origin`
      }
    }
  };

  return <Doughnut data={chartData} options={options} />;
}

export default OriginChart;