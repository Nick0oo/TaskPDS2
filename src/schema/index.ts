const { mergeTypeDefs } = require("@graphql-tools/merge");

const BaseSchema = require("./base-types");
const UserSchema = require("./user-types");
const TaskSchema = require("./task-types");
const CommentsSchema = require("./comments-types");
const ProjectSchema = require("./projects-types");
const SubtaskSchema = require("./subtask-types");
const StatusSchema = require("./status-types");
const PrioritiesSchema = require("./priorities-types");
const TagsSchema = require("./tags-types");

const typeDefs = mergeTypeDefs([
	BaseSchema,
	UserSchema,
	TaskSchema,
	CommentsSchema,
	ProjectSchema,
	SubtaskSchema,
	StatusSchema,
	PrioritiesSchema,
	TagsSchema,
]);

module.exports = {
	typeDefs,
};
