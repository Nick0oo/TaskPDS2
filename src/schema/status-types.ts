const gqlStatusTypes = require('graphql-tag');

const StatusTypes = gqlStatusTypes`
  type Status {
    id: ID!
    name: String!
    tasks: [Task]
  }

  input StatusInput {
    name: String!
  }

  type Query {
    allStatus: [Status]
    statusById(id: ID!): Status
  }

  type Mutation {
    createStatus(data: StatusInput!): Status
    updateStatus(id: ID!, data: StatusInput!): Status
    deleteStatus(id: ID!): Boolean
  }
`;
module.exports = StatusTypes;