import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Getdata } from './Getdata';
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';

const Barcharts = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      { label: 'Bajo', data: [0, 0, 0, 0], backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 2 },
      { label: 'Medio', data: [0, 0, 0, 0], backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)', borderWidth: 2 },
      { label: 'Alto', data: [0, 0, 0, 0], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 2 }
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let nuevoArray = [];
        let arrayTemporal = [];
        const newLabels = [];
        const newDatasets = [...data.datasets];

        const respu = await Getdata('notas/loadnotescharts');
        const ele = respu.data;

        ele.forEach(({ period, notas, idstu }) => {
          arrayTemporal = nuevoArray.filter(resp => resp.period === period && resp.idstu === idstu);
          let sum = notas.reduce((acc, { num }) => acc + parseFloat(num), 0);
          let sumPro = sum / notas.length;

          if (arrayTemporal.length > 0) {
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])].notas.push(sumPro.toFixed(1));
          } else {
            nuevoArray.push({ idstu, period, notas: [sumPro.toFixed(1)] });
            if (!newLabels.includes(`Período ${period}`)) {
              newLabels.push(`Período ${period}`);
            }
          }
        });

        nuevoArray.forEach(({ period, notas }) => {
          let pro = notas.reduce((acc, num) => acc + parseFloat(num), 0);
          let proFinal = (pro / notas.length).toFixed(1);

          if (proFinal < 3) {
            newDatasets[0].data[period - 1] += 1;
          } else if (proFinal >= 3 && proFinal < 4) {
            newDatasets[1].data[period - 1] += 1;
          } else {
            newDatasets[2].data[period - 1] += 1;
          }
        });

        setData({ labels: newLabels, datasets: newDatasets });
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const controllers = Object.values(Chartjs).filter(chart => chart.id !== undefined);
  Chart.register(...controllers);

  return (
    loading ? <p>Cargando datos...</p> : (
      <Bar
        data={data}
        width={700}
        height={300}
        options={{
          maintainAspectRatio: false,
        }}
      />
    )
  );
};

export { Barcharts };
