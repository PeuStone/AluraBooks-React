import { useQuery } from "@tanstack/react-query"
import { ILivro } from "../../interfaces/ILivro"
import { useParams } from "react-router-dom"
import { obterLivro } from "../../http"
import Loader from "../../Componentes/Loader"
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbQuantidade, AbQuantidadeProps } from "alurabooksbase"
import { formatador } from "../../utils/formatador-moeda"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { useState } from "react"
import SobreAutor from "../../Componentes/SobreAutor"
import BlocoSobre from "../../Componentes/BlocoSobre"
import './DetalhesLivro.css'

const DetalhesLivro = () => {

    const [opcao, setOpcao] = useState<AbGrupoOpcao>()
    const [quantidade, setQuantidade] = useState<AbQuantidadeProps>()

    const params = useParams()
    const { data: livro, isLoading } = useQuery<ILivro | null>({ queryKey: ['livro', params.slug], queryFn: () => obterLivro(params.slug || '') })

    if (isLoading || !livro) {
        return <Loader />
    }

    const opcoes: AbGrupoOpcao[] = livro.opcoesCompra ? livro.opcoesCompra.map(opcao => ({
        id: opcao.id,
        corpo: formatador.format(opcao.preco),
        titulo: opcao.titulo,
        rodape: opcao.formatos ? opcao.formatos.join(',') : ''
    }))
        : []

    return (
        <section className="detalhes-livro">
            <TituloPrincipal texto="Detalhes do Livro" />
            <div>
                <div className="container">
                    <figure>
                        <img src={livro.imagemCapa} alt={livro.descricao} />
                    </figure>
                    <div className="detalhes">
                        <h2>{livro.titulo}</h2>
                        <p>{livro.descricao}</p>
                        <h3>Selecione o formato do seu livro:</h3>
                        <div className="opcoes">
                            <AbGrupoOpcoes
                                opcoes={opcoes}
                                onChange={setOpcao}
                                valorPadrao={opcao}
                            />
                        </div>
                        <p className="opcoes-texto"><strong>*Você terá acesso às futuras atualizações do livro.</strong></p>
                        <footer className="footer-quantidade">
                            <div className="quantidade">
                                <AbQuantidade
                                    value={Number(quantidade)}
                                    onChange={() => setQuantidade}
                                />
                            </div>
                            <div>
                                <AbBotao texto="Comprar" />
                            </div>
                        </footer>
                    </div>
                </div>
                <div className="textos">
                    <SobreAutor autorId={livro.autor} />
                    <BlocoSobre titulo="Sobre o Livro" corpo={livro.sobre} />
                </div>
            </div>
        </section>
    )
}

export default DetalhesLivro