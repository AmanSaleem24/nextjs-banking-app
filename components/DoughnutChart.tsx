"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: "Banks",
      data: [4232, 8381, 5653],
      backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
    },
  ],
  labels: ["Bank1", "Bank2", "Bank3"],
};

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
            legend:{
                display: false
            }
        }
      }}
    />
  );
};

export default DoughnutChart;
