const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
    error: String
  }

  type RootQuery {

    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {

  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
