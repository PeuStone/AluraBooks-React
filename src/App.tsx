import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AbApolloClient from './Componentes/AbApolloClient';

const queryClient = new QueryClient()

function App() {
  return (
    <AbApolloClient>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </QueryClientProvider>
    </AbApolloClient>
  )
}

export default App;
