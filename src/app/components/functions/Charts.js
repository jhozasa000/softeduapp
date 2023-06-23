"use client"
import { Chart } from "chart.js";
import * as Chartjs from "chart.js";
import { Bar } from 'react-chartjs-2';


const data = {
    labels: ['1 triemstre', '2 trimestre', '3 trimestre'],
    datasets: [{
      label: 'Bajo',
      data: [23,12,45],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth:2,
      
    },{
        label: 'Medio',
        data: [25,13,60],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth:2,
        
      },
      {
        label: 'Alto',
        data: [120,23,14],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth:2,
        
      }],
    
  }

const controllers = Object.values(Chartjs).filter(
  (chart) => chart.id !== undefined
);

Chart.register(...controllers);

const Barcharts = () =>{
    return  <Bar
                data={data}
                width={700}
                height={150}
                options={{
                    maintainAspectRatio: false
                }}
            />
}  

export {Barcharts}