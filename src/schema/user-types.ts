const UserTypes =`
  type User {
    id: ID!
    name: String!
    lastname: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    comments: [Comment]
    tasks: [Task]
    projects: [Project]
  }

  type Users {
    users: [User!]
  }

  input CreateUserInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    lastname: String
    email: String
    password: String
  }

  type Query {
    allUsers: [User!]
    userById(id: ID!): User
  }

  type Mutation {
    createUser(data: CreateUserInput!): User
    updateUser(id: ID!, data: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
  }
`;

module.exports = UserTypes;
