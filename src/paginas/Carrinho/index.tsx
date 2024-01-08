import { Link } from "react-router-dom"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { useCarrinho } from "../../graphql/carrinho/hooks"
import { formatador } from "../../utils/formatador-moeda"
import { AbBotao } from "alurabooksbase"
import ItemCarrinho from "./ItemCarrinho"
import './Carrinho.css'

const Carrinho = () => {

    const { data } = useCarrinho()

    return (
        <section className="pagina-carrinho">
            <TituloPrincipal texto="Minha Sacola" />
            <div className="conteudo">
                <h4>Itens selecionados</h4>
                <div className="itens">
                    {data?.carrinho?.itens.map((item, index) => <ItemCarrinho key={index} item={item} />)}
                </div>
                <div>
                    <Link to='/'>Continuar comprando</Link>
                </div>
                <footer>
                    <ul>
                        <li>Total da compra</li>
                        <li><strong>{formatador.format(data?.carrinho?.total || 0)}</strong></li>
                        <li>
                            <AbBotao texto="Finalizar Compra" />
                        </li>
                    </ul>
                </footer>
            </div>
        </section>
    )
}

export default Carrinho