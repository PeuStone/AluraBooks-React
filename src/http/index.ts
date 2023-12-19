import axios, { AxiosError } from "axios";
import { useObterToken } from "../hooks";
import { useNavigate } from "react-router-dom";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = useObterToken()
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro) {
    console.log('Erro no interceptor do axios');

    return Promise.reject(erro)
})

http.interceptors.response.use(function (resposta) {
    return resposta
}, function (error: AxiosError) {
    const navegar = useNavigate()
    if (error.response?.status === 401) {
        navegar('/')
        return Promise.reject()
    }
    return Promise.reject(error)
})

export default http

export const obterCategoriaSlug = async (slug: string) => {
    const resposta = await http.get<ICategoria[]>('categorias', {
        params: {
            slug
        }
    })
    return resposta.data[0]
}

export const obterLivroDestaque = async (tipo: string) => {
    const resposta = await http.get<ILivro[]>(`public/${tipo}`)
    return resposta.data
}

export const obterProdutosDaCategoria = async (categoria: ICategoria) => {
    const resposta = await http.get<ILivro[]>('livros', {
        params: {
            categoria: categoria.id
        }
    })
    return resposta.data
}