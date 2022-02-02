const { ApolloServer, gql } = require('apollo-server');

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Buscar informações (GET)
// Mutation -> Alterar informações (POST/PUT/DELETE/PATCH)
// Scalar Types -> String, Int, Float, Boolean, ID

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`:fire: Server started at ${url}`));