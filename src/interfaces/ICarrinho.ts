import { IItemCarrinho } from "./IITemCarrinho"

export interface ICarrinho {
    total: number
    itens: IItemCarrinho[]
}