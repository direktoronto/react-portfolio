import { graphql } from 'msw'

export const handlers = [
  graphql.query('GetProjects', (req, res, ctx) => {
    return res(
      ctx.data({
        projects: [
          {
            id: '1',
            title: 'React Portfolio',
            description: 'A demo portfolio showcasing React and GraphQL skills.'
          },
          {
            id: '2',
            title: 'Task Manager',
            description: 'Small task app demonstrating state management.'
          }
        ]
      })
    )
  })
]
