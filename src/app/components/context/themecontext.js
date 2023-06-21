"use client"
import  { useState, createContext, useContext } from "react";


export const GlobalContext = createContext(null);

export const Context = ({ children })  => {
    const [datasite, setDatasite] = useState({
        user:false,
        data:{}
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