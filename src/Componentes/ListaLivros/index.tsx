import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { AbCampoTexto } from "alurabooksbase"
import { useEffect, useState } from "react"
import { useLivros } from "../../graphql/livros/hooks"
import { useReactiveVar } from "@apollo/client"
import { filtroLivrosVar, livrosVar } from "../../graphql/livros/state"

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('')

  useEffect(() => {
    filtroLivrosVar({
      ...filtroLivrosVar(),
      titulo: textoBusca.length >= 3 ? textoBusca : ''
    })
  }, [textoBusca])

  filtroLivrosVar({
    ...filtroLivrosVar(),
    categoria
  })

  const livros = useReactiveVar(livrosVar)

  useLivros()

  return (
    <section>
      <form className="busca-livros">
        <AbCampoTexto value={textoBusca} onChange={setTextoBusca} label={""} placeholder="Digite o título" />
      </form>
      <div className="livros">
        {livros.map(livro => <CardLivro livro={livro} key={livro.id} />)}
      </div>
    </section>
  )
}

export default ListaLivros