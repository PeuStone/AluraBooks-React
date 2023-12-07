import { AbBotao, AbCampoTexto, AbModal } from "alurabooksbase"
import imagemPrincipal from './assets/login.png'
import { useState } from "react"
import axios from 'axios'
import './ModalLoginUsuario.css'
import { usePersistirToken } from "../../hooks"

interface PropsModalLoginUsuario {
    aberta: boolean
    aoFechar: () => void
}

const ModalLoginUsuario = ({ aberta, aoFechar }: PropsModalLoginUsuario) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const setToken = usePersistirToken()

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            email,
            senha
        }

        axios.post('http://localhost:8000/public/login', usuario)
            .then(resposta => {
                setToken(resposta.data.access_token)
                setEmail('')
                setSenha('')
                aoFechar()
            })
            .catch(erro => {
                if (erro?.response?.data?.message) {
                    alert(erro.response.data.message)
                } else {
                    alert('Ops! Ocorreu um erro ao tentar efetuar o login! Entre em contato com o suporte')
                }
            })
    }

    return (
        <AbModal
            titulo="Login"
            aberta={aberta}
            aoFechar={aoFechar}
        >
            <section className="corpoModalLogin">
                <figure>
                    <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
                </figure>
                <form onSubmit={aoSubmeterForm}>
                    <AbCampoTexto
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    />
                    <AbCampoTexto
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <div className="acoes">
                        <AbBotao texto="Login" />
                    </div>
                </form>
            </section>
        </AbModal>
    )
}

export default ModalLoginUsuario