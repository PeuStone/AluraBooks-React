import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { AbBotao, AbCampoTexto } from "alurabooksbase"
import { useState } from "react"
import { useLivros } from "../../graphql/livros/hooks"
import { useReactiveVar } from "@apollo/client"
import { filtroLivrosVar, livrosVar } from "../../graphql/livros/state"

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('')

  filtroLivrosVar({
    categoria,
  })

  const livros = useReactiveVar(livrosVar)

  useLivros()

  return (
    <section>
      <form className="busca-livros">
        <AbCampoTexto value={textoBusca} onChange={setTextoBusca} label={""} placeholder="Digite o título" />
        <div className="busca-botao">
          <AbBotao texto="Buscar" />
        </div>
      </form>
      <div className="livros">
        {livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
      </div>
    </section>
  )
}

export default ListaLivros