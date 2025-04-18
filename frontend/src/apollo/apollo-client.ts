import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          // @ts-expect-error: suspense is valid but not typed
          suspense: true,
        },
        query: {
          // @ts-expect-error: suspense is valid but not typed
          suspense: true,
        },
      },
});

export default client;