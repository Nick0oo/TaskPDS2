const {
  Tasks: TaskModel,
  Users: UserModelForTask,
  Comments: CommentModelForTask,
  Projects: ProjectModelForTask,
  Subtasks: SubtaskModelForTask,
  StatusTask: StatusModelForTask,
  Priorities: PriorityModelForTask,
  Tags: TagModelForTask,
} = require("../models");

console.log({
  UserModelForTask,
  CommentModelForTask,
  ProjectModelForTask,
  SubtaskModelForTask,
  StatusModelForTask,
  PriorityModelForTask,
  TagModelForTask,
});

const tasksResolver = {
  Query: {
    allTasks: async () => {
      return await TaskModel.findAll({
        include: [
          { model: UserModelForTask, as: "user" },
          { model: CommentModelForTask, as: "comments" },
          { model: ProjectModelForTask, as: "project" },
          { model: SubtaskModelForTask, as: "subtasks" },
          { model: StatusModelForTask, as: "status" },
          { model: PriorityModelForTask, as: "priority" },
          { model: TagModelForTask, as: "tags" },
        ],
      });
    },

    taskById: async (_: any, { id }: { id: number }) => {
      return await TaskModel.findByPk(id, {
        include: [
          { model: UserModelForTask, as: "user" },
          { model: CommentModelForTask, as: "comments" },
          { model: ProjectModelForTask, as: "project" },
          { model: SubtaskModelForTask, as: "subtasks" },
          { model: StatusModelForTask, as: "status" },
          { model: PriorityModelForTask, as: "priority" },
          { model: TagModelForTask, as: "tags" },
        ],
      });
    },
  },
  

  Mutation: {
    createTask: async (_: any, { data }: { data: Record<string, any> }) => {
      const { tags, ...taskData } = data;
      const task = await TaskModel.create(taskData);

      if (tags && Array.isArray(tags)) {
        await task.setTags(tags);
      }

      // Retornar con relaciones cargadas
      return await TaskModel.findByPk(task.id, {
        include: [{ model: TagModelForTask, as: "tags" }],
      });
    },

    updateTask: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const { tags, ...taskData } = data;

      const [affectedCount] = await TaskModel.update(taskData, {
        where: { id },
      });

      if (affectedCount > 0) {
        const updatedTask = await TaskModel.findByPk(id);

        if (tags && Array.isArray(tags)) {
          await updatedTask.setTags(tags);
        }

        return await TaskModel.findByPk(id, {
          include: [{ model: TagModelForTask, as: "tags" }],
        });
      }

      return null;
    },

    deleteTask: async (_: any, { id }: { id: number }) => {
      const deletedCount = await TaskModel.destroy({
        where: { id },
      });
      return deletedCount > 0;
    },
  },

  Task: {
    user: async (task: { userId: number }) => {
      return await UserModelForTask.findByPk(task.userId);
    },
    comments: async (task: { id: number }) => {
      return await CommentModelForTask.findAll({ where: { taskId: task.id } });
    },
    project: async (task: { projectId: number }) => {
      return await ProjectModelForTask.findByPk(task.projectId);
    },
    subtasks: async (task: { id: number }) => {
      return await SubtaskModelForTask.findAll({ where: { taskId: task.id } });
    },
    status: async (task: { statusId: number }) => {
      return await StatusModelForTask.findByPk(task.statusId);
    },
    priority: async (task: { priorityId: number }) => {
      return await PriorityModelForTask.findByPk(task.priorityId);
    },
    tags: async (task: { id: number }) => {
      const taskInstance = await TaskModel.findByPk(task.id);
      return await taskInstance.getTags();
    },
     dueDate: (task: { dueDate: string }) => {
    return new Date(task.dueDate).toISOString().split('T')[0];
  },
  },
};

module.exports = tasksResolver;
