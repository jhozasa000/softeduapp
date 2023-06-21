'use client'
import Menu from "../components/menu/Menu"
import { GlobalContext } from '../components/context/themecontext';
import { useContext, useEffect } from "react";


  const metadata = {
    title: 'Materias',
    description: 'Materias',
  }

export default function Materias(){   
    const { datasite, setDatasite } = useContext(GlobalContext);
    
    useEffect(() => {
        setDatasite(null)
    });

    

    console.log('datasite   ',datasite);

    

    return(
        <main>
            <title>{'Materias'}</title>
            <Menu flag='materias' />
        </main>
    )

}           