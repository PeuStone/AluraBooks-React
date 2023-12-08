import { AbBotao } from "alurabooksbase"
import axios from 'axios'
import './Pedidos.css'
import { useEffect, useState } from "react"
import { useObterToken } from "../../hooks"
import { IPedido } from "../../interfaces/IPedido"

const Pedidos = () => {

    const formatador = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

    const [pedidos, setPedidos] = useState<IPedido[]>([])

    const token = useObterToken()

    useEffect(() => {
        axios.get<IPedido[]>('http://localhost:8000/pedidos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resposta => setPedidos(resposta.data))
            .catch(erro => console.log(erro)
            )
    }, [])

    const excluirPedido = (pedido: IPedido) => {
        axios.delete<IPedido[]>('http://localhost:8000/pedidos/' + pedido.id, {
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