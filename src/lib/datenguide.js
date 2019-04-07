import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import fetch from 'unfetch'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api-next.datengui.de/graphql',
    fetch
  }),
  cache: new InMemoryCache()
})

export default client
