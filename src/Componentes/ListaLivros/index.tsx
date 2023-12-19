import { useQuery } from "@tanstack/react-query"
import { ICategoria } from "../../interfaces/ICategoria"
import { obterProdutosDaCategoria } from "../../http"
import CardLivro from "../CardLivro"

interface ListaLivrosProps {
    categoria: ICategoria
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {

    const { data: produtos } = useQuery({ queryKey: ['buscaLivrosCategoria', categoria], queryFn: () => obterProdutosDaCategoria(categoria) })


    return (
        <>
            {produtos?.map(livro => <CardLivro livro={livro} key={livro.id} />)}
        </>
    )
}

export default ListaLivros