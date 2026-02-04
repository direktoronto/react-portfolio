import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import Home from './Home'
import { gql } from '@apollo/client'

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      date
      price
      category
      venue
      image
      status
    }
  }
`

const mockEvents = [
  {
    id: '1',
    title: 'Taylor Swift | The Eras Tour',
    description: 'Live at Rogers Centre',
    date: '2026-03-15',
    price: 89.99,
    category: 'Concert',
    venue: 'Rogers Centre, Toronto',
    image: '🎤',
    status: 'On Sale'
  },
  {
    id: '2',
    title: 'Toronto Raptors vs Lakers',
    description: 'NBA Regular Season',
    date: '2026-02-20',
    price: 125.00,
    category: 'Sports',
    venue: 'Scotiabank Arena',
    image: '🏀',
    status: 'Few Left'
  },
]

const mocks = [
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: mockEvents,
      },
    },
  },
]

describe('Home Component', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )
    expect(screen.getByText(/loading events/i)).toBeInTheDocument()
  })

  it('renders events after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
      expect(screen.getByText('Toronto Raptors vs Lakers')).toBeInTheDocument()
    })
  })

  it('filters events by search term', async () => {
    const user = userEvent.setup()
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search events/i)
    await user.type(searchInput, 'Taylor')

    expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
    expect(screen.queryByText('Toronto Raptors vs Lakers')).not.toBeInTheDocument()
  })

  it('filters events by category', async () => {
    const user = userEvent.setup()
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
    })

    const sportsButton = screen.getByRole('button', { name: 'Sports' })
    await user.click(sportsButton)

    expect(screen.queryByText('Taylor Swift | The Eras Tour')).not.toBeInTheDocument()
    expect(screen.getByText('Toronto Raptors vs Lakers')).toBeInTheDocument()
  })

  it('shows correct event count', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('2 events found')).toBeInTheDocument()
    })
  })

  it('shows no results message when search has no matches', async () => {
    const user = userEvent.setup()
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search events/i)
    await user.type(searchInput, 'nonexistent event')

    expect(screen.getByText('No events found')).toBeInTheDocument()
  })

  it('handles GraphQL errors gracefully', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_PROJECTS,
        },
        error: new Error('Network error'),
      },
    ]

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('displays event details correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Taylor Swift | The Eras Tour')).toBeInTheDocument()
      expect(screen.getByText('Live at Rogers Centre')).toBeInTheDocument()
      expect(screen.getByText('Rogers Centre, Toronto')).toBeInTheDocument()
      expect(screen.getByText('$89.99')).toBeInTheDocument()
    })
  })
})
