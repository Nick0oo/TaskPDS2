const { StatusTask: StatusModel, Tasks: TaskStatusModel } = require('../models');

const statusResolver = {
  Query: {
    allStatus: async () => {
      return await StatusModel.findAll({
        include: [{ model: TaskStatusModel, as: 'tasks' }],
      });
    },

    statusById: async (_: any, { id }: { id: number }) => {
      return await StatusModel.findByPk(id, {
        include: [{ model: TaskStatusModel, as: 'tasks' }],
      });
    },
  },

  Mutation: {
    createStatus: async (_: any, { data }: { data: Record<string, any> }) => {
      return await StatusModel.create(data);
    },

    updateStatus: async (_: any, { id, data }: { id: number, data: Record<string, any> }) => {
      const [affectedCount] = await StatusModel.update(data, { where: { id } });
      if (affectedCount > 0) {
        return await StatusModel.findByPk(id);
      }
      return null;
    },

    deleteStatus: async (_: any, { id }: { id: number }) => {
      const deletedCount = await StatusModel.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },
};

module.exports = statusResolver;
