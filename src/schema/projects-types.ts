const gqlProjectsTypes = require('graphql-tag');

const ProjectsTypes = gqlProjectsTypes`
  type Project {
    id: ID!
    title: String!
    description: String
    createdAt: String
    updatedAt: String
    user: User
    Tasks: [Task]
  }

  type Projects {
    projects: [Project!]
  }

  input CreateProjectInput {
    title: String!
    description: String
    createdBy: ID!
  }

  input UpdateProjectInput {
    title: String
    description: String
  }

  extend type Query {
    allProjects: [Project!]
    projectsById(id: ID!): Project
  }

  extend type Mutation {
    createProjects(data: CreateProjectInput!): Project!
    updateProjects(id: ID!, data: UpdateProjectInput!): Project
    deleteProjects(id: ID!): Boolean!
  }
    extend type User {
    projects: [Project!]  
  }

  extend type Task {
    project: Project
  }
`;

module.exports = ProjectsTypes;