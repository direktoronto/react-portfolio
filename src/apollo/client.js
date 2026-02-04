import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export default function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
  })
}
