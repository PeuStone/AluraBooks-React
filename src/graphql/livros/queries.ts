import { gql } from "@apollo/client";

export const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
     id
     slug
     titulo
     imagemCapa
     opcoesCompra{
        id
        preco
      }
    }
  }
`

export const OBTER_DESTAQUES = gql`
query ObterLancamentos {
  destaques {
    lancamentos {
      id
      slug
      titulo
      imagemCapa
      descricao
      opcoesCompra {
        id
        preco
      }
      autorId   
    }
    maisVendidos {
      id
      slug
      titulo
      imagemCapa
      descricao
      opcoesCompra {
        id
        preco
      }
      autorId     
    }
  }
}
`
export const OBTER_DETALHESLIVROS = gql`
query ObterLivro($slug: String!) {
  livro(slug: $slug) {
    id
    imagemCapa
    descricao
    titulo
    slug
    sobre
    autor {
      nome
      sobre
    }
    opcoesCompra {
      id
      titulo
      formatos
      preco
    }
    tags {
      id
      nome
    }
  }
}
`