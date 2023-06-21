'use client'
import Menu from "../components/menu/Menu"
import { GlobalContext } from '../components/context/themecontext';
import { useContext, useEffect } from "react";


 const metadata = {
    title: 'Notas',
    description: 'Notas',
  }

export default function Notas(){    

    const { datasite, setDatasite } = useContext(GlobalContext);

    useEffect(() => {
        console.log('datasite  notas   ', datasite)
    },[]);

    return(
        <main>
            <Menu flag='notas' />
        </main>
    )

}           