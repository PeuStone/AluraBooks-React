import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { obterCategoriaSlug } from "../../http"
import { useParams } from "react-router-dom"
import Loader from "../../Componentes/Loader"
import { useQuery } from "@tanstack/react-query"
import ListaLivros from "../../Componentes/ListaLivros"

const Categoria = () => {

    const params = useParams()

    const { data: categoria, isLoading } = useQuery({ queryKey: ['CategoriaSlug'], queryFn: () => obterCategoriaSlug(params.slug || '') })

    if (isLoading) {
        return <Loader />
    }

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''} />
            <ListaLivros categoria={categoria!} />
        </section>
    )
}

export default Categoria