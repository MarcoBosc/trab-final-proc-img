import { createContext, useContext, useState } from "react";
import { ProdutosContext, ProdutosProvider } from "./ProdutosContext";

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {
  const [usuario, setUsuario] = useState({});

  const { finalizarCompra } = useContext(ProdutosContext);

  const validadeUser = (user) => {
    if (
      user.charAt(0) &&
      user.length >= 5 &&
      user.length <= 8 &&
      /^[a-zA-Z]+$/.test(user)
    ) {
      return true;
    }
    return false;
  };

  function login(user) {
    if (user) {
      if (validadeUser(user)) {
        setUsuario({
          nome: user,
          endereco: "Rua dos tongo",
          banco: "Tigrinho",
          telefone: "(54) 98765-4321",
          pCompra: true,
        });
        async function finalizando() {
          const resultado = await finalizarCompra();
        }
        return "ok";
      } else {
        return (
          "ERRO: O nome de usuário deve começar com uma letra, " +
          "conter apenas letras e números e ter de 5 a 8 caracteres"
        );
      }
    }
  }

  return (
    <AutenticacaoContext.Provider value={{ usuario, login }}>
      {children}
    </AutenticacaoContext.Provider>
  );
}
