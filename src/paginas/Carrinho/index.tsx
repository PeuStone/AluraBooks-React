import { Link } from "react-router-dom"
import TituloPrincipal from "../../Componentes/TituloPrincipal"
import { formatador } from "../../utils/formatador-moeda"
import { AbBotao } from "alurabooksbase"
import ItemCarrinho from "./ItemCarrinho"
import './Carrinho.css'
import { useCarrinhoContext } from "../../contextApi/carrinho"

const Carrinho = () => {

    const { carrinho, adicionarItemCarrinho } = useCarrinhoContext()

    return (
        <section className="pagina-carrinho">
            <TituloPrincipal texto="Minha Sacola" />
            <div className="conteudo">
                <h4>Itens selecionados</h4>
                <div className="itens">
                    {carrinho?.itens.map((item, index) => <ItemCarrinho key={index} item={item} />)}
                </div>
                <div>
                    <Link to='/'>Continuar comprando</Link>
                </div>
                <footer>
                    <ul>
                        <li>Total da compra</li>
                        <li><strong>{formatador.format(carrinho?.total || 0)}</strong></li>
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