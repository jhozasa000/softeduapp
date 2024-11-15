"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalContext } from '../context/themecontext';
import { RingLoader } from 'react-spinners';

export default function Session({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { datasite } = useGlobalContext (); // Usa useContext para acceder al contexto

  useEffect(() => {
    if (!datasite?.user) {
      router.push('/');
    } else {
      setLoading(false); 
    }
  }, [datasite, pathname, router]);

  // Mientras está en carga (o redirigiendo), no mostrar nada
  if (loading) {
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <RingLoader color="#0070f3" size={100} />
      </div>
    );
  }
  return children;
}
