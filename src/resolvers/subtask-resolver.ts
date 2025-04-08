const { subtask: SubtaskModel , Tasks: SubTaskModel } = require("../models");

const subtaskResolver = {
  Query: {
    allSubtasks: async () => {
      const subtasks = await SubtaskModel.findAll({
        include: [{ model: SubTaskModel, as: "subtasks" }],
      });
      return subtasks;
    },
    subtasksById: async (_: any, { id }: { id: number }) => {
      return await SubtaskModel.findByPk(id);
    },
  },
  Mutation: {
    createSubtask: async (_: any, { data }: { data: any }) => {
      return await SubtaskModel.create(data);
    },
    updateSubtask: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await SubtaskModel.update(data, {
        where: { id },
      });
      if (affectedCount > 0) {
        return await SubtaskModel.findByPk(id);
      }
      return null;
    },
    deleteSubtask: async (_: any, { id }: { id: number }) => {
      const deletedCount = await SubtaskModel.destroy({
        where: { id },
      });
      return deletedCount > 0;
    },
  },
};

module.exports = subtaskResolver;
