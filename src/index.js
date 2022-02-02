const { ApolloServer, gql } = require("apollo-server");

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Buscar informações (GET)
// Mutation -> Alterar informações (POST/PUT/DELETE/PATCH)
// Scalar Types -> String, Int, Float, Boolean, ID

/*
  query {
    posts{
      id
      title
      body      
    }
*/

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User]! # ! -> é obrigatório, retorna um [] vazio mas não pode retornar null
    getUserByEmail(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

const users = [
  {
    _id: String(Math.random()),
    name: "Jeffy",
    email: "teste@email.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Jeffy2",
    email: "teste2@email.com",
    active: false,
  },
  {
    _id: String(Math.random()),
    name: "Jeffy3",
    email: "teste3@email.com",
    active: true,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log(`:fire: Server started at ${url}`));
