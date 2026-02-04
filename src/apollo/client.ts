import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export default function createApolloClient(): ApolloClient<any> {
  return new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache()
  })
}
