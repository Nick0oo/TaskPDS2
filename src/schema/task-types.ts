const gqlTask = require('graphql-tag');

const TaskTypes = gqlTask`
  type Task {
    id: ID!
    projectId: ID!
    title: String!
    description: String!
    dueDate: String!
    priorityId: ID!
    statusId: ID!
    createdAt: String
    updatedAt: String

    # Relaciones
    user: User
    comments: [Comment]
    project: Project
    subtasks: [Subtask]
    status: Status
    priority: Priorities
    tags: [Tag]
  }

  type TaskList {
    tasks: [Task!]
  }

  input CreateTaskInput {
    projectId: ID!
    title: String!
    description: String!
    dueDate: String!
    priorityId: ID!
    statusId: ID!
    userId: ID!        
    tags: [ID]          
  }

  input UpdateTaskInput {
    projectId: ID
    title: String
    description: String
    dueDate: String
    priorityId: ID
    statusId: ID
    userId: ID
    tags: [ID]
  }

  extend type Query {
    allTasks: [Task!]
    taskById(id: ID!): Task
  }

  extend type Mutation {
    createTask(data: CreateTaskInput!): Task!
    updateTask(id: ID!, data: UpdateTaskInput!): Task
    deleteTask(id: ID!): Boolean!
  }
`;

module.exports = TaskTypes;
