import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export function InfoProvider({ children }) {
  const [nome, setNome] = useState("");

  return (
    <GlobalContext.Provider value={{ nome, setNome }}>
      {children}
    </GlobalContext.Provider>
  );
}
