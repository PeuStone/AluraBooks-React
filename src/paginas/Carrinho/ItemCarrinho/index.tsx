import { AbQuantidade } from "alurabooksbase"
import { IItemCarrinho } from "../../../interfaces/IITemCarrinho"
import { formatador } from "../../../utils/formatador-moeda"
import lixeira from './assets/lixeira.png'
import './ItemCarrinho.css'
import { useCarrinhoContext } from "../../../contextApi/carrinho"

interface ItemCarrinhoProps {
    item: IItemCarrinho
}

const ItemCarrinho = ({ item }: ItemCarrinhoProps) => {

    const { adicionarItemCarrinho, removerItemCarrinho } = useCarrinhoContext()

    const alterarQuantidadeItem = (quantidade: number) => {
        if (quantidade === 0) {
            removerItemCarrinho({
                livro: item.livro,
                opcaoCompra: item.opcaoCompra,
                quantidade
            })
        }
        adicionarItemCarrinho({
            livro: item.livro,
            opcaoCompra: item.opcaoCompra,
            quantidade
        })
    }

    return (
        <div className="item-carrinho">
            <figure>
                <img src={item.livro.imagemCapa} alt={item.livro.descricao} />
            </figure>
            <div className="detalhes">
                <ul className="lista-itens">
                    <li className="titulo">{item.livro.titulo}</li>
                    <li className="descricao">{item.livro.descricao}</li>
                    <li className="autor">Por: {item.livro.autor.nome}</li>
                </ul>
            </div>
            <div>
                <ul className="preco">
                    <li className="label">
                        <strong>Preço:</strong>
                    </li>
                    <li className="valor">
                        {formatador.format(item.opcaoCompra.preco)}
                    </li>
                </ul>
            </div>
            <div className="quantidade">
                <AbQuantidade value={item.quantidade} onChange={alterarQuantidadeItem} />
            </div>
            <div>
                <button className="btn-excluir" onClick={() => removerItemCarrinho(item)}>
                    <img src={lixeira} alt="Ícone de uma lixeira" />
                </button>
            </div>
        </div>
    )
}

export default ItemCarrinho