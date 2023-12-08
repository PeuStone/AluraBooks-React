import { AbBotao } from "alurabooksbase"

import './Pedidos.css'

const Pedidos = () => {
    return (
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            <div className="pedido">
                <ul>
                    <li>Pedido: <strong>123456</strong></li>
                    <li>Data do pedido: <strong>10/12/2023</strong></li>
                    <li>Valor total: <strong>R$42.00</strong></li>
                    <li>Entrega realizada em: <strong>15/12/2023</strong></li>
                </ul>
                <AbBotao texto="Detalhes" />
            </div>
            <div className="pedido">
                <ul>
                    <li>Pedido: <strong>123456</strong></li>
                    <li>Data do pedido: <strong>10/12/2023</strong></li>
                    <li>Valor total: <strong>R$42.00</strong></li>
                    <li>Entrega realizada em: <strong>15/12/2023</strong></li>
                </ul>
                <AbBotao texto="Detalhes" />
            </div>
            <div className="pedido">
                <ul>
                    <li>Pedido: <strong>123456</strong></li>
                    <li>Data do pedido: <strong>10/12/2023</strong></li>
                    <li>Valor total: <strong>R$42.00</strong></li>
                    <li>Entrega realizada em: <strong>15/12/2023</strong></li>
                </ul>
                <AbBotao texto="Detalhes" />
            </div>
            <div className="pedido">
                <ul>
                    <li>Pedido: <strong>123456</strong></li>
                    <li>Data do pedido: <strong>10/12/2023</strong></li>
                    <li>Valor total: <strong>R$42.00</strong></li>
                    <li>Entrega realizada em: <strong>15/12/2023</strong></li>
                </ul>
                <AbBotao texto="Detalhes" />
            </div>
        </section>
    )
}

export default Pedidos