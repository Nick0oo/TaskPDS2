const { Users: UserModel, Tasks: TaskUserModel } = require("../models");

const usersResolver = {
  Query: {
    allUsers: async () => {
      const users = await UserModel.findAll({
        include: [{ model: TaskUserModel, as: "tasks" }],
      });
      return users;
    },
    userById: async (_: any, { id }: { id: number }) => {
      return await UserModel.findByPk(id, {
        include: [{ model: TaskUserModel, as: "tasks" }],
      });
    },
  },
  Mutation: {
    createUser: async (_: any, { data }: { data: Record<string, any> }) => {
      return await UserModel.create(data);
    },
    updateUser: async (_: any, { id, data }: { id: number; data: Record<string, any> }) => {
      const [affectedCount] = await UserModel.update(data, {
        where: { id },
      });
      if (affectedCount > 0) {
        return await UserModel.findByPk(id);
      }
      return null;
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      const deletedCount = await UserModel.destroy({
        where: { id },
      });
      return deletedCount > 0;
    },
  },
};

module.exports = usersResolver;
