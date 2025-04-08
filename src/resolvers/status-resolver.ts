const { Status: StatusModel, Task: TaskStatusModel } = require('../models');

const statusResolver = {
    Query: {
        allStatus: async () => {
            const status = await StatusModel.findAll({
                include: [{ model: TaskStatusModel, as: 'tasks' }],
            });
            return status;
        },
        statusById: async (_: any, { id }: { id: number }) => {
            return await StatusModel.findByPk(id);
        },
    },
    Mutation: {
        createStatus: async (_: any, { data }: { data: { [key: string]: any } }) => {
            return await StatusModel.create(data);
        },
        updateStatus: async (_: any, { id }: { id: number }, { data }: { data: { [key: string]: any } }) => {
            const [affectedCount] = await StatusModel.update(data, {
                where: { id },
            });
            if (affectedCount > 0) {
                return await StatusModel.findByPk(id);
            }
            return null;
        },
        deleteStatus: async (_: any, { id }: { id: number }) => {
            const deletedCount = await StatusModel.destroy({
                where: { id },
            });
            return deletedCount > 0;
        },
    },
};
module.exports = statusResolver;