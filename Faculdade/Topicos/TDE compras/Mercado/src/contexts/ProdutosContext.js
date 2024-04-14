import { createContext, useContext, useEffect, useState } from "react";
import {
  pegarProdutos,
  salvarProduto,
  removerProduto,
} from "../servicos/requisicoes/produtos";

import { AutenticacaoContext } from "../contexts/AutenticacaoContext";

export const ProdutosContext = createContext({});

export function ProdutosProvider({ children }) {
  const [quantidade, setQuantidade] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimosVistos, setUltimosVistos] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [calculoDesconto, setCalculoDesconto] = useState(0);

  const { usuario } = useContext(AutenticacaoContext);

  useEffect(async () => {
    const resultado = await pegarProdutos();
    setCarrinho(resultado);
    setQuantidade(resultado.length);
  }, []);

  async function viuProduto(produto) {
    const resultado = await salvarProduto(produto);
    const novoItemCarinho = [...carrinho, resultado];
    setCarrinho(novoItemCarinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);

    setQuantidade(quantidade + 1);
    let novoPrecoTotal = precoTotal + produto.preco;
    setPrecoTotal(novoPrecoTotal);

    if (usuario.pCompra) {
      setDesconto(0.15);
    } else if (precoTotal >= 200 && precoTotal < 500) {
      setDesconto(0.05);
    } else if (precoTotal >= 500) {
      setDesconto(0.1);
    } else {
      setDesconto(0);
    }

    console.log(precoTotal + " precoTotal");

    setCalculoDesconto(precoTotal * desconto);
    console.log(calculoDesconto + " calculoDesconto");

    setValorTotal(precoTotal - calculoDesconto);

    console.log(valorTotal);
  }

  async function finalizarCompra() {
    try {
      carrinho.forEach(async (produto) => {
        await removerProduto(produto);
      });
      setQuantidade(0);
      setPrecoTotal(0);
      setCarrinho([]);
      return "Compra finalizada com sucesso!";
    } catch (erro) {
      return "Erro ao finalizar a compra, tente novamente!";
    }
  }

  return (
    <ProdutosContext.Provider
      value={{
        quantidade,
        ultimosVistos,
        precoTotal,
        carrinho,
        viuProduto,
        finalizarCompra,
        desconto,
        valorTotal,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}
