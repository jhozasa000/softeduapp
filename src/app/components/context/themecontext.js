import { createContext, useReducer, useContext, useEffect } from "react";

export const GlobalContext = createContext(null);

// Estado inicial
const initialState = () => {
  const savedData = typeof window !== "undefined" ? localStorage.getItem("datasite") : null;
  return savedData ? JSON.parse(savedData) : { user: null };
};

// Función reductora para manejar acciones
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const Context = ({ children }) => {
  const [datasite, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    localStorage.setItem("datasite", JSON.stringify(datasite));
  }, [datasite]);

  return (
    <GlobalContext.Provider value={{ datasite, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook para usar el contexto fácilmente
export const useGlobalContext = () => useContext(GlobalContext);
