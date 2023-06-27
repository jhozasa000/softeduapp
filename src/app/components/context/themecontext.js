"use client"
import  { useState, createContext, useContext } from "react";


export const GlobalContext = createContext(null);

export const Context = ({ children })  => {
    let [datasite, setDatasite] = useState({
        user:false,
        calendario:[],
        jornada:[],
        docentes:[],
        grados:[],
        materias:[],
        estudiantes:[],
        notas:[],
        reportes:[],
        usuario:[],
        horarios:[],
        profesion:[]
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