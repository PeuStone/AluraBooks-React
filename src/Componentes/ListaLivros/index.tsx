import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { gql, useQuery } from "@apollo/client"
import { ILivro } from "../../interfaces/ILivro"
import { AbBotao, AbCampoTexto } from "alurabooksbase"
import { useState } from "react"

interface ListaLivrosProps {
  categoria: ICategoria
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int) {
    livros(categoriaId: $categoriaId) {
     id
     slug
     titulo
     imagemCapa
     opcoesCompra{
        id
        preco
      }
    }
  }
`

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('')
  const { data } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    }
  })
  // const { data: produtos } = useQuery({ queryKey: ['buscaLivrosCategoria', categoria], queryFn: () => obterProdutosDaCategoria(categoria) })

  return (
    <section>
      <form className="busca-livros">
        <AbCampoTexto value={textoBusca} onChange={setTextoBusca} label={""} placeholder="Digite o título" />
        <div className="busca-botao">
          <AbBotao texto="Buscar" />
        </div>
      </form>
      <div className="livros">
        {data?.livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
      </div>
    </section>
  )
}

export default ListaLivros