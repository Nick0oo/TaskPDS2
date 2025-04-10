const gqlSubtaskTypes = require('graphql-tag');

const SubtaskTypes = gqlSubtaskTypes`
  type Subtask {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String
    updatedAt: String

    # Relaciones
    task: Task
  }

  type Subtasks {
    subtasks: [Subtask!]
  }

  input CreateSubtaskInput {
    title: String!
    description: String
    completed: Boolean!
    taskId: ID!
  }

  input UpdateSubtaskInput {
    title: String
    description: String
    completed: Boolean
    taskId: ID
  }

  extend type Query {
    allSubtasks: [Subtask!]
    subtasksById(id: ID!): Subtask
  }

  extend type Mutation {
    createSubtask(data: CreateSubtaskInput!): Subtask!
    updateSubtask(id: ID!, data: UpdateSubtaskInput!): Subtask
    deleteSubtask(id: ID!): Boolean!
  }
`;

module.exports = SubtaskTypes;
