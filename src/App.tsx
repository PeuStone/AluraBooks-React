import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './rotas';

function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  )
}

export default App;
