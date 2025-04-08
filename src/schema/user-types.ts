const gqlUser = require('graphql-tag');

const UserTypes = gqlUser`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }

  type Users {
    users: [User!]
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  extend type Query {
    allUsers: [User!]
    userById(id: ID!): User
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = UserTypes;
