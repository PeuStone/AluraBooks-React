import { useParams } from "react-router-dom"
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbQuantidade, AbTags } from "alurabooksbase"
import { formatador } from "../../utils/formatador-moeda"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { useState } from "react"
import './DetalhesLivro.css'
import { useLivro } from "../../graphql/livros/hooks"
import Loader from "../../Componentes/Loader"
import BlocoSobre from "../../Componentes/BlocoSobre"
import { useCarrinhoContext } from "../../contextApi/carrinho"

const DetalhesLivro = () => {

    const [opcao, setOpcao] = useState<AbGrupoOpcao>()
    const [quantidade, setQuantidade] = useState(1)

    const { adicionarItemCarrinho } = useCarrinhoContext()

    const params = useParams()

    const { data, loading, error } = useLivro(params.slug || '')

    if (error) {
        console.log('Alguma coisa deu errado');
        console.log(error)
        return <h1>Ops! Algum erro inesperado aconteceu</h1>
    }

    if (loading) {
        return <Loader />
    }

    const opcoes: AbGrupoOpcao[] = data?.livro.opcoesCompra ? data?.livro.opcoesCompra.map(opcao => ({
        id: opcao.id,
        corpo: formatador.format(opcao.preco),
        titulo: opcao.titulo,
        rodape: opcao.formatos ? opcao.formatos.join(',') : ''
    }))
        : []

    const aoAdicionarItemCarrinho = () => {
        if (!data?.livro) {
            return
        }
        const opcaoCompra = data.livro.opcoesCompra.find(op => op.id === opcao?.id)
        if (!opcaoCompra) {
            alert('Por Favor selecione uma opção de compra!')
            return
        }
        adicionarItemCarrinho({
            livro: data?.livro,
            quantidade,
            opcaoCompra
        })
    }

    return (
        <section className="detalhes-livro">
            <TituloPrincipal texto="Detalhes do Livro" />
            <div>
                <div className="container">
                    <figure>
                        <img src={data?.livro.imagemCapa} alt={data?.livro.descricao} />
                    </figure>
                    <div className="detalhes">
                        <h2>{data?.livro.titulo}</h2>
                        <p>{data?.livro.descricao}</p>
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
                                    value={quantidade}
                                    onChange={setQuantidade}
                                />
                            </div>
                            <div>
                                <AbBotao texto="Comprar" onClick={aoAdicionarItemCarrinho} />
                            </div>
                        </footer>
                    </div>
                </div>
                <div>
                    <BlocoSobre titulo="Sobre o autor" corpo={data?.livro.autor.sobre} />
                    <BlocoSobre titulo="Sobre o livro" corpo={data?.livro.sobre} />
                </div>
                <div className="tags">
                    {data?.livro.tags?.map(tag => <AbTags key={tag.nome} texto={tag.nome} contexto="secundario" />)}
                </div>
            </div>
        </section>
    )
}

export default DetalhesLivro