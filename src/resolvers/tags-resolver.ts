const { Tags: TagsModel, Tasks: TaskTagsModel } = require('../models');

const TagsResolver = {
  Query: {
    allTags: async () => {
      const tags = await TagsModel.findAll({
        include: [{ model: TaskTagsModel, as: 'tasks' }], // incluye las tareas asociadas al tag
      });
      return tags;
    },
    TagsById: async (_: any, { id }: { id: number }) => {
      return await TagsModel.findByPk(id, {
        include: [{ model: TaskTagsModel, as: 'tasks' }],
      });
    },
  },
  Mutation: {
    createTags: async (_: any, { data }: { data: { [key: string]: any } }) => {
      return await TagsModel.create(data);
    },
    updateTags: async (_: any, { id }: { id: number }, { data }: { data: { [key: string]: any } }) => {
      const [affectedCount] = await TagsModel.update(data, {
        where: { id },
      });
      if (affectedCount > 0) {
        return await TagsModel.findByPk(id);
      }
      return null;
    },
    deleteTags: async (_: any, { id }: { id: number }) => {
      const deletedCount = await TagsModel.destroy({
        where: { id },
      });
      return deletedCount > 0;
    },
  },
};

module.exports = TagsResolver;
