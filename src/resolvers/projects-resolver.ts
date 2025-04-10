const { Projects: ProjectsModel, Tasks: TaskProjectModel, Users: UserProjectModel } = require('../models');

const projectsResolver = {
  Query: {
    allProjects: async () => {
      return await ProjectsModel.findAll({
        include: [
          { model: UserProjectModel, as: 'user' },
          { model: TaskProjectModel, as: 'tasks' },
        ],
      });
    },

    projectsById: async (_: any, { id }: { id: number }) => {
      return await ProjectsModel.findByPk(id, {
        include: [
          { model: UserProjectModel, as: 'user' },
          { model: TaskProjectModel, as: 'tasks' },
        ],
      });
    },
  },

  Mutation: {
    createProjects: async (_: any, { data }: { data: Record<string, any> }) => {
      return await ProjectsModel.create(data);
    },

    updateProjects: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await ProjectsModel.update(data, { where: { id } });
      if (affectedCount > 0) {
        return await ProjectsModel.findByPk(id);
      }
      return null;
    },

    deleteProjects: async (_: any, { id }: { id: number }) => {
      const deletedCount = await ProjectsModel.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },

  User: {
    projects: async (user: { id: number }) => {
      return await ProjectsModel.findAll({ where: { createdBy: user.id } });
    },
  },

  Project: {
    user: async (project: { createdBy: number }) => {
      return await UserProjectModel.findByPk(project.createdBy);
    },
    tasks: async (project: { id: number }) => {
      return await TaskProjectModel.findAll({ where: { projectId: project.id } });
    },
  },
};

module.exports = projectsResolver;
