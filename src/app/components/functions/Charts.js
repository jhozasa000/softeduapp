"use client"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Postdata } from "./Postdata";
import { Getdata } from "./Getdata";

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barcharts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Bajo',
        data: [0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Medio',
        data: [0, 0, 0, 0],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
      },
      {
        label: 'Alto',
        data: [0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  });

  const fetchData = async () => {
    const response = await Getdata('notas/loadnotescharts');
    const newArray = [];
    const tempLabels = [];

    response.data.forEach(({ period, notas, idstu }) => {
      const existingEntry = newArray.find((entry) => entry.period === period && entry.idstu === idstu);
      const average = notas.reduce((sum, { num }) => sum + parseFloat(num), 0) / notas.length;

      if (existingEntry) {
        existingEntry.notas.push(average.toFixed(1));
      } else {
        newArray.push({ idstu, period, notas: [average.toFixed(1)] });
        if (!tempLabels.includes(`Período ${period}`)) {
          tempLabels.push(`Período ${period}`);
        }
      }
    });

    const updatedData = { ...chartData, labels: tempLabels };

    newArray.forEach(({ period, notas }) => {
      const avg = notas.reduce((sum, val) => sum + parseFloat(val), 0) / notas.length;
      const avgRounded = parseFloat(avg.toFixed(1));

      if (avgRounded < 3) {
        updatedData.datasets[0].data[period - 1]++;
      } else if (avgRounded >= 3 && avgRounded < 4) {
        updatedData.datasets[1].data[period - 1]++;
      } else {
        updatedData.datasets[2].data[period - 1]++;
      }
    });

    setChartData(updatedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Bar
      data={chartData}
      width={700}
      height={150}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

export { Barcharts };
