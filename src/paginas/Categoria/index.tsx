import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { obterCategoriaSlug } from "../../http"
import { useParams } from "react-router-dom"
import Loader from "../../Componentes/Loader"
import { useQuery } from "@tanstack/react-query"

const Categoria = () => {

    const params = useParams()

    const { data: categoria, isLoading } = useQuery({ queryKey: ['CategoriaSlug'], queryFn: () => obterCategoriaSlug(params.slug || '') })

    if (isLoading) {
        return <Loader />
    }

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''} />
        </section>
    )
}

export default Categoria