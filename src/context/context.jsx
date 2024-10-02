import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext in components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
