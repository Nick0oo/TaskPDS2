const { Users: UserModel, Tasks: TaskUserModel } = require ("../models");

const usersResolver = {
  Query: {
    allUSers: async () => {
      const users = await UserModel.findAll({
        include: [{ model: Tasks, as: "tasks" }],
      });
      return users;
    },
    usersById: async (_: any, { id }: { id: number }) => {
      return await UserModel.findByPk(id);
    },
  },
  Mutation: {
    createusers: async (_: any, { data }: { data: any }) => {
      return await UserModel.create(data);
    },
    updateusers: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await UserModel.update(data, {
        where: { id },
      });
      if (affectedCount > 0) {
        return await Users.findByPk(id);
      }
      return null;
    },
    deleteusers: async (_: any, { id }: { id: number }) => {
      const deletedCount = await UserModel.destroy({
        where: { id },
      });
      return deletedCount > 0;
    },
  },
};

module.exports = usersResolver;
