const gqlProjectsTypes = require('graphql-tag');

const ProjectsTypes = gqlProjectsTypes`
  type Project {
    id: ID!
    name: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  type Projects {
    projects: [Project!]
  }

  input CreateProjectInput {
    name: String!
    description: String
  }

  input UpdateProjectInput {
    name: String
    description: String
  }

  extend type Query {
    allProjects: [Project!]
    projectById(id: ID!): Project
  }

  extend type Mutation {
    createProject(data: CreateProjectInput!): Project!
    updateProject(id: ID!, data: UpdateProjectInput!): Project
    deleteProject(id: ID!): Boolean!
  }
`;

module.exports = ProjectsTypes;