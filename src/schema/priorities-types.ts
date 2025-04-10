const gqlPrioritiesTypes = require('graphql-tag');

const PrioritiesTypes = gqlPrioritiesTypes`
  type Priorities {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  input CreatePrioritiesInput {
    name: String!
  }

  input UpdatePrioritiesInput {
    name: String
  }

  extend type Query {
    allPriorities: [Priorities]
    prioritiesById(id: ID!): Priorities
  }

  extend type Mutation {
    createPriority(data: CreatePrioritiesInput!): Priorities
    updatePriority(id: ID!, data: UpdatePrioritiesInput!): Priorities
    deletePriority(id: ID!): Boolean
  }
`;

module.exports = PrioritiesTypes;
