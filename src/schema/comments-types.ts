const gqlComment = require('graphql-tag');

const CommentTypes = gqlComment`
  type Comment {
    id: ID!
    taskId: ID!
    userId: ID!
    description: String!
    createdAt: String
    updatedAt: String
  }

  type Comments {
    comments: [Comment!]
  }

  input CreateCommentInput {
    taskId: ID!
    userId: ID!
    description: String!
  }

  input UpdateCommentInput {
    taskId: ID
    userId: ID
    content: String
  }

  extend type Query {
    allComments: [Comment!]
    commentById(id: ID!): Comment
  }

  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment
    deleteComment(id: ID!): Boolean!
  }
`;

module.exports = CommentTypes;
