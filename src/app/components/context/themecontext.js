"use client"
import  { useState, createContext, useContext } from "react";


export const GlobalContext = createContext(null);

export const Context = ({ children })  => {
    const [datasite, setDatasite] = useState({
        user:false,
        calendario:['calendario a'],
        jornada:['tarde','mañana'],
        docentes:[
          {
            inp:'jhonnatan zapata',
            inpcedula:'1130633993',
            inpPro:'sistemas',
            inptel:'3177168312',
            inpdir:'calle 20 norte',
            filesteacher:0
          }
        ],
        grados:[
          {
            inpG:'grado 1',
            inpC:'calendario a',
            inpJ:'tarde'
          }
        ],
        materias:['matematicas','sociales','español'],
        materiasrelaion:[
          {
            inpm:'matematicas',inpg:'grado 1 - calendario a - tarde',inpd:'jhonnatan zapata - sistemas'
          }
        ],
        estudiantes:[
          {
            inNom:'Jhonnatan',
            inApe:'Zapata S',
            inBir:'16/07/1987',
            inpId:1130633993,
            inTel:3177168312,
            inMail:'jhozasa@hotmail.com'
          }
        ],
        estudiantesrelacion:[
          {
            idstu:1130633993,
            idgrade: 'grado 1 - calendario a - tarde'
          }
        ],
        notas:[],
        reportes:[],
        usuario:[],
        horarios:[],
        profesion:['ingles','sistemas']
    });
  
    return (
      <GlobalContext.Provider value={{ datasite, setDatasite }}>
        {children}
      </GlobalContext.Provider>
    );
  }

export const Reducer = () => {
     const { datasite, setDatasite } = useContext(GlobalContext);
     return { datasite, setDatasite }
  }