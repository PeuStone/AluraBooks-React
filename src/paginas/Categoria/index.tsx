import { useEffect, useState } from "react"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { ICategoria } from "../../interfaces/ICategoria"
import http from "../../http"
import { useParams } from "react-router-dom"
import Loader from "../../Componentes/Loader"

const Categoria = () => {

    const [categoria, setCategoria] = useState<ICategoria>()
    const [estaCarregando, setEstaCarregando] = useState(true)
    const params = useParams()

    useEffect(() => {
        setEstaCarregando(true)
        http.get('categorias', {
            params: {
                slug: params.slug
            }
        }).then(resposta => {
            setCategoria(resposta.data[0])
            setEstaCarregando(false)
        }).catch(erro => {
            console.log(erro)
            setEstaCarregando(false)
        })
    }, [params.slug])

    if (estaCarregando) {
        return <Loader />
    }

    return (
        <section>
            <TituloPrincipal texto={categoria?.nome ?? ''} />
        </section>
    )
}

export default Categoria