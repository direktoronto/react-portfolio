import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

describe('App Component', () => {
  it('renders header with EventFinder title', () => {
    render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
    
    expect(screen.getByText('EventFinder')).toBeInTheDocument()
  })

  it('renders navigation with Home link', () => {
    render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  it('has correct link href', () => {
    render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
    
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
