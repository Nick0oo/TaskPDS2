const { mergeResolvers } = require("@graphql-tools/merge");

const userResolvers = require("./users-resolver");
const tasksResolvers = require("./tasks-resolver");
const commentResolvers = require("./comments-resolver");
const projectResolvers = require("./projects-resolver");
const subtaskResolvers = require("./subtask-resolver");
const statusResolvers = require("./status-resolver");
const prioritiesResolvers = require("./priorities-resolver");
const tagsResolvers = require("./tags-resolver");

const resolver = mergeResolvers([
  userResolvers,
  tasksResolvers,
  commentResolvers,
  projectResolvers,
  subtaskResolvers,
  statusResolvers,
  prioritiesResolvers,
  tagsResolvers,
]);

module.exports = resolver;
