const { Priorities: PrioritiesModel, Tasks: TaskPrioritiesModel } = require('../models');

const prioritiesResolver = {
  Query: {
    allPriorities: async () => {
      return await PrioritiesModel.findAll({
        include: [{ model: TaskPrioritiesModel, as: 'tasks' }],
      });
    },

    prioritiesById: async (_: any, { id }: { id: number }) => {
      return await PrioritiesModel.findByPk(id, {
        include: [{ model: TaskPrioritiesModel, as: 'tasks' }],
      });
    },
  },

  Mutation: {
    createPriority: async (_: any, { data }: { data: Record<string, any> }) => {
      return await PrioritiesModel.create(data);
    },

    updatePriority: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await PrioritiesModel.update(data, { where: { id } });
      if (affectedCount > 0) {
        return await PrioritiesModel.findByPk(id);
      }
      return null;
    },

    deletePriority: async (_: any, { id }: { id: number }) => {
      const deletedCount = await PrioritiesModel.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },

  Priorities: {
    tasks: async (priority: { id: number }) => {
      return await TaskPrioritiesModel.findAll({ where: { priorityId: priority.id } });
    },
  },
};

module.exports = prioritiesResolver;
