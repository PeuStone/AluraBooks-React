import { AbCampoTexto } from "alurabooksbase"
import { useState } from "react"
import Banner from "../../Componentes/Banner"
import LivrosDestaque from "../../Componentes/LivrosDestaque"
import Newsletter from "../../Componentes/Newsletter"
import TagsCategorias from "../../Componentes/TagsCategorias"
import Titulo from "../../Componentes/Titulo"

import './Home.css'
import { useQuery } from "@tanstack/react-query"
import { obterLivroDestaque } from "../../http"

const Home = () => {
    const [busca, setBusca] = useState("")

    const { data: lancamentos } = useQuery({ queryKey: ['destaques'], queryFn: () => obterLivroDestaque('lancamentos') })
    const { data: maisVendidos } = useQuery({ queryKey: ['maisVendidos'], queryFn: () => obterLivroDestaque('mais-vendidos') })

    return (<section className="home">
        <Banner subtitulo="Encontre em nossa estante o que precisa para seu desenvolvimento!" titulo="Já sabe por onde começar?">
            <form className="buscar">
                <AbCampoTexto
                    placeholder="Qual será sua próxima leitura?"
                    value={busca}
                    onChange={setBusca}
                    darkmode={true}
                    placeholderAlign="center" label={""} />
            </form>
        </Banner>
        <Titulo texto="ÚLTIMOS LANÇAMENTOS" />
        <LivrosDestaque livros={lancamentos ?? []} />
        <Titulo texto="MAIS VENDIDOS" />
        <LivrosDestaque livros={maisVendidos ?? []} />
        <TagsCategorias />
        <Newsletter />
    </section>)
}

export default Home