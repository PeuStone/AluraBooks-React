import { useEffect, useState } from "react"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { ICategoria } from "../../interfaces/ICategoria"
import http from "../../http"
import { useParams } from "react-router-dom"

const Categoria = () => {

    const [categoria, setCategoria] = useState<ICategoria>()
    const params = useParams()

    useEffect(() => {
        http.get('categorias', {
            params: {
                slug: params.slug
            }
        }).then(resposta => {
            setCategoria(resposta.data[0])
        })
    }, [params.slug])

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''} />
        </section>
    )
}

export default Categoria