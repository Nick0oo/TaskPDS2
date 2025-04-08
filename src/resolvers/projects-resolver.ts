const { Projects: ProjectsModel, Task: TaskProjectModel, User: UserProjectModel } = require('../models');
const projectsResolver = {
    Query: {
        allProjects: async () => {
            const projects = await ProjectsModel.findAll({
                include: [{ model: UserProjectModel, as: 'users' }, { model: TaskProjectModel, as: 'tasks' }],
            });
            return projects;
        },
        projectsById: async (_: any, { id }: { id: number }) => {
            return await ProjectsModel.findByPk(id);
        },
    },
    Mutation: {
        createProjects: async (_: any, { data }: { data: { [key: string]: any } }) => {
            return await ProjectsModel.create(data);
        },
        updateProjects: async (_: any, { id }: { id: number }, { data }: { data: { [key: string]: any } }) => {
            const [affectedCount] = await ProjectsModel.update(data, {
                where: { id },
            });
            if (affectedCount > 0) {
                return await ProjectsModel.findByPk(id);
            }
            return null;
        },
        deleteProjects: async (_: any, { id }: { id: number }) => {
            const deletedCount = await ProjectsModel.destroy({
                where: { id },
            });
            return deletedCount > 0;
        },
    },
    User: {
        projects: async (user: { id: number }): Promise<typeof ProjectsModel[]> => {
            return await ProjectsModel.findAll({
                where: { userId: user.id },
            });
        },
    },
    Task: {
        projects: async (task: { id: number }): Promise<typeof ProjectsModel[]> => {
            return await ProjectsModel.findAll({
                where: { taskId: task.id },
            });
        },
    },
    Project: {
        user: async (project: { userId: number }): Promise<typeof UserProjectModel | null> => {
            return await UserProjectModel.findByPk(project.userId);
        },
        task: async (project: { taskId: number }): Promise<typeof TaskProjectModel | null> => {
            return await TaskProjectModel.findByPk(project.taskId);
        },
    },
    TaskList: {
        projects: async (task: { id: number }): Promise<typeof ProjectsModel[]> => {
            return await ProjectsModel.findAll({
                where: { taskId: task.id },
            });
        },
    },
    UserList: {
        projects: async (user: { id: number }): Promise<typeof ProjectsModel[]> => {
            return await ProjectsModel.findAll({
                where: { userId: user.id },
            });
        },
    },
    ProjectsList: {
        projects: async (project: { id: number }): Promise<typeof ProjectsModel[]> => {
            return await ProjectsModel.findAll({
                where: { projectId: project.id },
            });
        },
    },
};
module.exports = projectsResolver;