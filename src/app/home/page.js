"use client"
import { useState, useEffect } from 'react';
import Menu from '../components/menu/Menu';
import { Barcharts } from '../components/functions/Charts';
import Ads from '../components/functions/Ads';

export default function Home() {
  const [chartHeight, setChartHeight] = useState(500); // Altura inicial

  useEffect(() => {
    const updateChartHeight = () => {
      setChartHeight(window.innerHeight * 0.4); // 40% de la altura de la pantalla
    };

    window.addEventListener('resize', updateChartHeight);
    updateChartHeight(); // Ajusta el tamaño inicial

    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  return (
    <main>
      <title>{'Inicio'}</title>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 text-center">
            <h3 className="my-3">Notas estudiantes</h3>
            <div style={{ height: `${chartHeight}px` }}>
              <Barcharts />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 text-center">
            <h3 className="my-3">Anuncios</h3>
            <Ads />
          </div>
        </div>
      </div>
    </main>
  );
}
