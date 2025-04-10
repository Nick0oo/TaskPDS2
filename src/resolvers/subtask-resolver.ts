const { Subtasks: SubtaskModel, Tasks: TaskSubtaskModel } = require("../models");

const subtaskResolver = {
  Query: {
    allSubtasks: async () => {
      return await SubtaskModel.findAll({
        include: [{ model: TaskSubtaskModel, as: "task" }],
      });
    },

    subtasksById: async (_: any, { id }: { id: number }) => {
      return await SubtaskModel.findByPk(id, {
        include: [{ model: TaskSubtaskModel, as: "task" }],
      });
    },
  },

  Mutation: {
    createSubtask: async (_: any, { data }: { data: Record<string, any> }) => {
      return await SubtaskModel.create(data);
    },

    updateSubtask: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await SubtaskModel.update(data, { where: { id } });
      if (affectedCount > 0) {
        return await SubtaskModel.findByPk(id);
      }
      return null;
    },

    deleteSubtask: async (_: any, { id }: { id: number }) => {
      const deletedCount = await SubtaskModel.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },

  Subtask: {
    task: async (subtask: { taskId: number }) => {
      return await TaskSubtaskModel.findByPk(subtask.taskId);
    },
  },
};
module.exports = subtaskResolver;
