const gqlStatusTypes = require('graphql-tag');

const StatusTypes = gqlStatusTypes`
  type Status {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Statuses {
    status: [Status!]
  }

  input CreateStatusInput {
    name: String!
  }

  input UpdateStatusInput {
    name: String
  }

  type Query {
    allStatus: [Status!]
    statusById(id: ID!): Status
  }

  type Mutation {
    createStatus(data: CreateStatusInput!): Status
    updateStatus(id: ID!, data: UpdateStatusInput!): Status
    deleteStatus(id: ID!): Boolean
  }

`;

module.exports = StatusTypes;
