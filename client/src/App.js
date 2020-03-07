import React from 'react'
import { GlobalProvider } from './context/GlobalState';
import { Layout } from './hoc/Layout'
import './App.css'

function App() {

  return (
      <GlobalProvider>
        <Layout />
      </GlobalProvider>
  );
}

export default App;
