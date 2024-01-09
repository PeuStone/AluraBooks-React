import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AbApolloClient from './Componentes/AbApolloClient';
import CarrinhoProvider from './contextApi/carrinho';

const queryClient = new QueryClient()

function App() {
  return (
    <AbApolloClient>
      <CarrinhoProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Rotas />
          </BrowserRouter>
        </QueryClientProvider>
      </CarrinhoProvider>
    </AbApolloClient>
  )
}

export default App;
