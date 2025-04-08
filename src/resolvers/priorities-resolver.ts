const { Priorities: PrioritiesModel, Task: TaskPrioritiesModel } = require('../models');

const prioritiesResolver = {
    Query: {
        allStatus: async () => {
            const priorities = await PrioritiesModel.findAll({
                include: [{ model: TaskPrioritiesModel, as: 'tasks' }],
            });
            return priorities;
        },
        statusById: async (_: any, { id }: { id: number }) => {
            return await PrioritiesModel.findByPk(id);
        },
    },
    Mutation: {
        createStatus: async (_: any, { data }: { data: { [key: string]: any } }) => {
            return await PrioritiesModel.create(data);
        },
        updateStatus: async (_: any, { id }: { id: number }, { data }: { data: { [key: string]: any } }) => {
            const [affectedCount] = await PrioritiesModel.update(data, {
                where: { id },
            });
            if (affectedCount > 0) {
                return await PrioritiesModel.findByPk(id);
            }
            return null;
        },
        deleteStatus: async (_: any, { id }: { id: number }) => {
            const deletedCount = await PrioritiesModel.destroy({
                where: { id },
            });
            return deletedCount > 0;
        },
    },
};
module.exports = prioritiesResolver;