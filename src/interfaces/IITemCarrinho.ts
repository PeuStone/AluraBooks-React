import { IOpcaoCompra } from "./ICompra";
import { ILivro } from "./ILivro";

export interface IItemCarrinho {
    livro: ILivro
    opcaoCompra: IOpcaoCompra
    quantidade: number
}