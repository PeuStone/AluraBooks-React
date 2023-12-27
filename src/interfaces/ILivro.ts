import { IAutor } from "./IAutor"
import { IOpcaoCompra } from "./ICompra"

export interface ILivro {
    id: number
    categoria: number
    titulo: string
    slug: string
    descricao: string
    isbn: string
    numeroPaginas: number
    publicacao: string
    imagemCapa: string
    autor: IAutor
    opcoesCompra: IOpcaoCompra[]
    sobre: string
}