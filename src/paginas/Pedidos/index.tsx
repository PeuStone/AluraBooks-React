import { AbBotao } from "alurabooksbase"
import './Pedidos.css'
import { useEffect, useState } from "react"
import { useObterToken } from "../../hooks"
import { IPedido } from "../../interfaces/IPedido"
import http from "../../http"

const Pedidos = () => {

    const formatador = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    const [pedidos, setPedidos] = useState<IPedido[]>([])

    const token = useObterToken()

    useEffect(() => {
        http.get<IPedido[]>('pedidos')
            .then(resposta => setPedidos(resposta.data))
            .catch(erro => console.log(erro))
    }, [])

    const excluirPedido = (pedido: IPedido) => {
        http.delete<IPedido[]>('pedidos/' + pedido.id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(() => {
            setPedidos(pedidos.filter(p => p.id !== pedido.id))
        })
            .catch(erro => console.log(erro))
    }

    return (
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            {pedidos.map(pedido => (
                <div className="pedido" key={pedido.id}>
                    <ul>
                        <li>Pedido: <strong>{pedido.id}</strong></li>
                        <li>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
                        <li>Valor total: <strong>{formatador.format(pedido.total)}</strong></li>
                        <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></li>
                        <li>
                            <button className="pedido__botao" onClick={() => excluirPedido(pedido)}>Excluir</button>
                        </li>
                    </ul>
                    <AbBotao texto="Detalhes" />
                </div>
            ))}
        </section>
    )
}

export default Pedidos