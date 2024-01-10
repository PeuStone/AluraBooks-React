import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import logo from './assets/Logo.svg'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useState } from "react"
import ModalLoginUsuario from "../ModalLoginUsuario"
import { useLimparToken, useObterToken } from "../../hooks"
import { ICategoria } from "../../interfaces/ICategoria"
import { gql, useQuery } from "@apollo/client"
import MiniCarrinho from "../MiniCarrinho"

const OBTER_CATEGORIA = gql`
query ObterCategorias {
    categorias{
      id
      slug
      nome
    }
  }
`

const BarraNavegacao = () => {

    const [modalCadastroAberta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)

    const { data } = useQuery<{ categorias: ICategoria[] }>(OBTER_CATEGORIA)
    let navegar = useNavigate()

    const token = useObterToken()
    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token != null)

    const aoEfetuarLogin = () => {
        setModalLoginAberta(false)
        setUsuarioEstaLogado(true)
    }

    const EfetuarLogout = () => {
        setUsuarioEstaLogado(false)
        useLimparToken()
        navegar('/')
    }

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    {data?.categorias.map(categoria => (
                        <li key={categoria.id}>
                            <Link to={`/categorias/${categoria.slug}`}>
                                {categoria.nome}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioEstaLogado && (
                <>
                    <li>
                        <BotaoNavegacao
                            texto="Login"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={() => setModalLoginAberta(true)}
                        />
                        <ModalLoginUsuario
                            aberta={modalLoginAberta}
                            aoFechar={() => setModalLoginAberta(false)}
                            aoEfetuarLogin={aoEfetuarLogin}
                        />
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Cadastrar-se"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={() => setModalCadastroAberta(true)}
                        />
                        <ModalCadastroUsuario
                            aberta={modalCadastroAberta}
                            aoFechar={() => setModalCadastroAberta(false)}
                        />
                    </li>
                </>
            )
            }
            {usuarioEstaLogado &&
                <>
                    <li>
                        <Link to='/minha-conta/pedidos'>Minha Conta</Link>
                    </li>
                    <li>
                        <MiniCarrinho />
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Logout"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={EfetuarLogout}
                        />
                    </li>
                </>
            }
        </ul>
    </nav>)
}

export default BarraNavegacao