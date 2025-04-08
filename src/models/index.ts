// 👇 Esto tiene que estar al principio del archivo
const { sequelize: sequelizeModels } = require("../config/config");
// Luego definís tus modelos
const _Task = require("./tasks");
const _User = require("./users");
const _Comment = require("./comments");
const _Project = require("./projects");
const _Subtask = require("./subtask");
const _StatusTask = require("./status");
const _Priorities = require("./priorities");
const _Tags = require("./tags");
const _TaskTags = require("./taskTags"); 

// Ejecutás los modelos pasándole sequelize
const StatusTask = _StatusTask(sequelizeModels);
const Tasks = _Task(sequelizeModels);
const Users = _User(sequelizeModels);
const Comments = _Comment(sequelizeModels);
const Projects = _Project(sequelizeModels);
const Subtasks = _Subtask(sequelizeModels);
const Priorities = _Priorities(sequelizeModels);
const Tags = _Tags(sequelizeModels);
const TaskTags = _TaskTags(sequelizeModels); 
// Definir las relaciones entre los modelos

Tasks.belongsTo(Users, { foreignKey: "userId", as: "user" });
Users.hasMany(Tasks, { foreignKey: "userId", as: "tasks" });
Tasks.hasMany(Comments, { foreignKey: "taskId", as: "comments" });
Comments.belongsTo(Tasks, { foreignKey: "taskId", as: "task" });
Users.hasMany(Comments, { foreignKey: "userId", as: "comments" });
Comments.belongsTo(Users, { foreignKey: "userId", as: "user" });
Projects.hasMany(Tasks, { foreignKey: "projectId", as: "tasks" });
Tasks.belongsTo(Projects, { foreignKey: "projectId", as: "project" });
Tasks.hasMany(Subtasks, { foreignKey: "taskId", as: "subtasks" });
Projects.belongsTo(Users, { foreignKey: "createdBy", as: "user" });
Subtasks.belongsTo(Tasks, { foreignKey: "taskId", as: "task" });
Tasks.belongsTo(StatusTask, { foreignKey: "statusId", as: "status" });
StatusTask.hasMany(Tasks, { foreignKey: "statusId", as: "tasks" });
Users.hasMany(Projects, { foreignKey: "createdBy", as: "projects" });
Priorities.hasMany(Tasks, { foreignKey: "priorityId", as: "tasks" });
Tasks.belongsTo(Priorities, { foreignKey: "priorityId", as: "priority" });
Tags.belongsToMany(Tasks, { through: TaskTags, foreignKey: "tagId", as: "tasks" });
Tasks.belongsToMany(Tags, { through: TaskTags, foreignKey: "taskId", as: "tags" });

module.exports = { Users, Tasks, Comments, Subtasks, StatusTask, Priorities, Tags, sequelizeModels, Projects, TaskTags };
