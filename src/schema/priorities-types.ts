const gqlPrioritiesTypes = require('graphql-tag');

const PrioritiesTypes = gqlPrioritiesTypes`
  type Priorities {
    id: ID!
    name: String!
    tasks: [Task]
  }

  input PrioritiesInput {
    name: String!
  }

  type Query {
    allPriorities: [Priorities]
    PrioritiesById(id: ID!): Priorities
  }

  type Mutation {
    createPriorities(data: PrioritiesInput!): Priorities
    updatePriorities(id: ID!, data: PrioritiesInput!): Priorities
    deletePriorities(id: ID!): Boolean
  }
`;
module.exports = PrioritiesTypes;