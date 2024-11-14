"use client";
import { useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalContext , Reducer } from '../context/themecontext'; // Asegúrate de que esta importación sea correcta

export default function Session({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { datasite } = useGlobalContext (); // Usa useContext para acceder al contexto

  useEffect(() => {
    console.log('datasite.user ###########', datasite?.user);
    console.log('usePathname -------------', pathname);

    if (!datasite?.user) {
      router.push('/');
    }
  }, [datasite, pathname]);

  return children;
}
