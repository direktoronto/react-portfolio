import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import './index.css'
import createApolloClient from './apollo/client'

const client = createApolloClient()

if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start()
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
