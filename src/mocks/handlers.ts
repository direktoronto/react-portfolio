import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetProjects', (req, res, ctx) => {
    return res(
      ctx.data({
        projects: [
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
          {
            id: '3',
            title: 'Hamilton',
            description: 'Broadway Musical',
            date: '2026-03-01',
            price: 150.00,
            category: 'Theatre',
            venue: 'Princess of Wales Theatre',
            image: '🎭',
            status: 'On Sale'
          },
          {
            id: '4',
            title: 'Coldplay: Music of the Spheres',
            description: 'World Tour 2026',
            date: '2026-04-10',
            price: 95.00,
            category: 'Concert',
            venue: 'Rogers Centre, Toronto',
            image: '🎸',
            status: 'Selling Fast'
          },
          {
            id: '5',
            title: 'Toronto FC vs Inter Miami',
            description: 'MLS Season Opener',
            date: '2026-02-28',
            price: 65.00,
            category: 'Sports',
            venue: 'BMO Field',
            image: '⚽',
            status: 'On Sale'
          },
          {
            id: '6',
            title: 'Stand-Up: Kevin Hart',
            description: 'Reality Check Tour',
            date: '2026-03-22',
            price: 75.00,
            category: 'Comedy',
            venue: 'Scotiabank Arena',
            image: '😂',
            status: 'On Sale'
          }
        ]
      })
    )
  })
]
