const { Tags: TagsModel, Tasks: TaskTagsModel } = require('../models');

const tagsResolver = {
  Query: {
    allTags: async () => {
      return await TagsModel.findAll({
        include: [{ model: TaskTagsModel, as: 'tasks' }],
      });
    },

    tagById: async (_: any, { id }: { id: number }) => {
      return await TagsModel.findByPk(id, {
        include: [{ model: TaskTagsModel, as: 'tasks' }],
      });
    },
  },

  Mutation: {
    createTag: async (_: any, { data }: { data: Record<string, any> }) => {
      return await TagsModel.create(data);
    },

    updateTag: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await TagsModel.update(data, {
        where: { id },
      });

      if (affectedCount > 0) {
        return await TagsModel.findByPk(id);
      }

      return null;
    },

    deleteTag: async (_: any, { id }: { id: number }) => {
      const deletedCount = await TagsModel.destroy({
        where: { id },
      });

      return deletedCount > 0;
    },
  },

  Tag: {
    tasks: async (tag: { id: number }) => {
      const tagInstance = await TagsModel.findByPk(tag.id);
      return await tagInstance.getTasks(); // método mágico de Sequelize
    },
  },
};

module.exports = tagsResolver;
