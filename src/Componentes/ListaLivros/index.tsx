import { ICategoria } from "../../interfaces/ICategoria"
import CardLivro from "../CardLivro"
import './ListaLivros.css'
import { AbBotao, AbCampoTexto } from "alurabooksbase"
import { useState } from "react"
import { useLivros } from "../../graphql/livros/hooks"
import { useReactiveVar } from "@apollo/client"
import { livrosVar } from "../../graphql/livros/state"

interface ListaLivrosProps {
  categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

  const [textoBusca, setTextoBusca] = useState('')
  const livros = useReactiveVar(livrosVar)
  console.log('livros =>', livros);
  
  const { data, refetch } = useLivros(categoria)
  if (data?.livros) {
    livrosVar(data.livros)
  }
  // const { data: produtos } = useQuery({ queryKey: ['buscaLivrosCategoria', categoria], queryFn: () => obterProdutosDaCategoria(categoria) })

  const buscarLivros = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (textoBusca) {
      refetch({
        categoriaId: categoria.id,
        titulo: textoBusca
      })
    }
  }

  return (
    <section>
      <form className="busca-livros" onSubmit={buscarLivros}>
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