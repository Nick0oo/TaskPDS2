const { Tasks : TaskModel, Users: UserTaskMode, Comments: CommentTaskModel, Projects: ProjectsTaskModel, Subtasks: SubtaskTaskModel, StatusTask: StatusTaskModel, Priorities: PrioritiesTaskModel, Tags: TagsTaskModel } = require('../models');

interface TaskData {
    [key: string]: any;
}

interface TaskResolver {
    Query: {
        allTasks: () => Promise<any>;
        taskById: (_: any, args: { id: number }) => Promise<any>;
    };
    Mutation: {
        createTask: (_: any, args: { data: TaskData }) => Promise<any>;
        updateTask: (_: any, args: { id: number, data: TaskData }) => Promise<any>;
        deleteTask: (_: any, args: { id: number }) => Promise<boolean>;
    };
    Task: {
        user: (task: any) => Promise<any>;
        comments: (task: any) => Promise<any>;
        project: (task: any) => Promise<any>;
        subtasks: (task: any) => Promise<any>;
        status: (task: any) => Promise<any>;
        priority: (task: any) => Promise<any>;
        tags: (task: any) => Promise<any>;
    };
}

const taskResolver: TaskResolver = {
    Query: {
        allTasks: async (): Promise<any> => {
            return await Tasks.findAll({
                include: [
                    { model: Users, as: 'user' },
                    { model: Comments, as: 'comments' },
                    { model: Projects, as: 'project' },
                    { model: Subtasks, as: 'subtasks' },
                    { model: StatusTask, as: 'status' },
                    { model: Priorities, as: 'priority' },
                    { model: Tags, as: 'tags' }, // many-to-many con tabla intermedia
                ],
            });
        },
        taskById: async (_: any, { id }: { id: number }): Promise<any> => {
            return await Tasks.findByPk(id, {
                include: [
                    { model: Users, as: 'user' },
                    { model: Comments, as: 'comments' },
                    { model: Projects, as: 'project' },
                    { model: Subtasks, as: 'subtasks' },
                    { model: StatusTask, as: 'status' },
                    { model: Priorities, as: 'priority' },
                    { model: Tags, as: 'tags' },
                ],
            });
        },
    },

    Mutation: {
        createTask: async (_: any, { data }: { data: TaskData }): Promise<any> => {
            const { tags, ...taskData } = data;

            const newTask = await Tasks.create(taskData);

            // Asociar tags si vienen
            if (tags && Array.isArray(tags)) {
                await newTask.setTags(tags); // espera un array de IDs de tags
            }

            return await Tasks.findByPk(newTask.id, {
                include: [{ model: Tags, as: 'tags' }],
            });
        },

        updateTask: async (_: any, { id, data }: { id: number, data: TaskData }): Promise<any> => {
            const { tags, ...taskData } = data;

            const [affected] = await Tasks.update(taskData, { where: { id } });

            if (affected === 0) return null;

            const updatedTask = await Tasks.findByPk(id);

            if (tags && Array.isArray(tags)) {
                await updatedTask.setTags(tags);
            }

            return await Tasks.findByPk(id, {
                include: [{ model: Tags, as: 'tags' }],
            });
        },

        deleteTask: async (_: any, { id }: { id: number }): Promise<boolean> => {
            const deleted = await Tasks.destroy({ where: { id } });
            return deleted > 0;
        },
    },

    Task: {
        user: async (task: any): Promise<any> => await task.getUser(),
        comments: async (task: any): Promise<any> => await task.getComments(),
        project: async (task: any): Promise<any> => await task.getProject(),
        subtasks: async (task: any): Promise<any> => await task.getSubtasks(),
        status: async (task: any): Promise<any> => await task.getStatus(),
        priority: async (task: any): Promise<any> => await task.getPriority(),
        tags: async (task: any): Promise<any> => await task.getTags(),
    },
};

module.exports = taskResolver;
