const gqlTags = require('graphql-tag');

const TagsTypes = gqlTags`
  type Tag {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  input CreateTagInput {
    name: String!
  }

  input UpdateTagInput {
    name: String
  }

  extend type Query {
    allTags: [Tag!]
    tagById(id: ID!): Tag
  }

  extend type Mutation {
    createTag(data: CreateTagInput!): Tag!
    updateTag(id: ID!, data: UpdateTagInput!): Tag
    deleteTag(id: ID!): Boolean!
  }
`;

module.exports = TagsTypes;
