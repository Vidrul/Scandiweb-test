import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
});

export default apolloClient;
