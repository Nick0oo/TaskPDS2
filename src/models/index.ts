// models/index.js

const { sequelize: sequelizeModels } = require("../config/config");

const _Task = require("./tasks");
const _User = require("./users");
const _Comment = require("./comments");
const _Project = require("./projects");
const _Subtask = require("./subtask");
const _StatusTask = require("./status");
const _Priorities = require("./priorities");
const _Tags = require("./tags");
const _TaskTags = require("./taskTags");

// Modelos
const StatusTask = _StatusTask(sequelizeModels);
const Tasks = _Task(sequelizeModels);
const Users = _User(sequelizeModels);
const Comments = _Comment(sequelizeModels);
const Projects = _Project(sequelizeModels);
const Subtasks = _Subtask(sequelizeModels);
const Priorities = _Priorities(sequelizeModels);
const Tags = _Tags(sequelizeModels);
const TaskTags = _TaskTags(sequelizeModels);

// Relaciones
Users.hasMany(Tasks, { foreignKey: "userId", as: "tasks" });
Users.hasMany(Comments, { foreignKey: "userId", as: "comments" });
Users.hasMany(Projects, { foreignKey: "createdBy", as: "projects" });

Tasks.belongsTo(Users, { foreignKey: "userId", as: "user" });
Tasks.belongsTo(Projects, { foreignKey: "projectId", as: "project" });
Tasks.belongsTo(StatusTask, { foreignKey: "statusId", as: "status" });
Tasks.belongsTo(Priorities, { foreignKey: "priorityId", as: "priority" });

Tasks.hasMany(Comments, { foreignKey: "taskId", as: "comments" });
Tasks.hasMany(Subtasks, { foreignKey: "taskId", as: "subtasks" });

Tasks.belongsToMany(Tags, {
    through: TaskTags,
    foreignKey: "taskId",
    otherKey: "tagId",
    as: "tags",
});

Comments.belongsTo(Tasks, { foreignKey: "taskId", as: "task" });
Comments.belongsTo(Users, { foreignKey: "userId", as: "user" });

Projects.hasMany(Tasks, { foreignKey: "projectId", as: "tasks" });
Projects.belongsTo(Users, { foreignKey: "createdBy", as: "user" });

Subtasks.belongsTo(Tasks, { foreignKey: "taskId", as: "task" });

StatusTask.hasMany(Tasks, { foreignKey: "statusId", as: "tasks" });

Priorities.hasMany(Tasks, { foreignKey: "priorityId", as: "tasks" });

Tags.belongsToMany(Tasks, {
    through: TaskTags,
    foreignKey: "tagId",
    otherKey: "taskId",
    as: "tasks",
});

// Export directo
module.exports = {
    Users,
    Tasks,
    Comments,
    Subtasks,
    StatusTask,
    Priorities,
    Tags,
    TaskTags,
    Projects,
    sequelize: sequelizeModels,
};
