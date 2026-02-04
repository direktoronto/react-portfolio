import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GET_PROJECTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {data.projects.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
