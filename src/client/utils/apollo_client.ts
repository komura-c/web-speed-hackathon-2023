import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: false,
  queryDeduplication: true,
  uri: '/graphql',
});
