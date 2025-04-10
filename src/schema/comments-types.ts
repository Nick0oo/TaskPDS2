const gqlComment = require('graphql-tag');

const CommentTypes = gqlComment`
  type Comment {
    id: ID!
    taskId: ID!
    userId: ID!
    description: String!
    createdAt: String
    updatedAt: String
    user: User
    task: Task
  }

  input CreateCommentInput {
    taskId: ID!
    userId: ID!
    description: String!
  }

  input UpdateCommentInput {
    taskId: ID
    userId: ID
    description: String
  }

  extend type Query {
    allComments: [Comment!]
    commentsById(id: ID!): Comment
  }

  extend type Mutation {
    createComments(data: CreateCommentInput!): Comment!
    updateComments(id: ID!, data: UpdateCommentInput!): Comment
    deleteComments(id: ID!): Boolean!
  }
`;

module.exports = CommentTypes;
