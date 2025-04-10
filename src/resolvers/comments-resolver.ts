const { Tasks: TaskCommentModel, Users: UserCommentModel, Comments: CommentsModel } = require("../models");

const commentsResolver = {
  Query: {
    allComments: async () => {
      return await CommentsModel.findAll({
        include: [
          { model: UserCommentModel, as: "user" },
          { model: TaskCommentModel, as: "task" },
        ],
      });
    },
    commentsById: async (_: any, { id }: { id: number }) => {
      return await CommentsModel.findByPk(id);
    }
  },    

  Mutation: {
    createComments: async (_: any, { data }: { data: { [key: string]: any } }) => {
      return await CommentsModel.create(data);
    },

    updateComments: async (_: any, { id, data }: { id: number, data: { [key: string]: any } }) => {
      const [affectedCount] = await CommentsModel.update(data, { where: { id } });
      if (affectedCount > 0) {
        return await CommentsModel.findByPk(id);
      }
      return null;
    },

    deleteComments: async (_: any, { id }: { id: number }) => {
      const deletedCount = await CommentsModel.destroy({ where: { id } });
      return deletedCount > 0;
    },
  },

  Task: {
    comments: async (task: { id: number }) => {
      return await CommentsModel.findAll({ where: { taskId: task.id } });
    },
  },

  User: {
    comments: async (user: { id: number }) => {
      return await CommentsModel.findAll({ where: { userId: user.id } });
    },
  },

  Comment: {
    user: async (comment: { userId: number }) => {
      return await UserCommentModel.findByPk(comment.userId);
    },
    task: async (comment: { taskId: number }) => {
      return await TaskCommentModel.findByPk(comment.taskId);
    },
  },
};

module.exports = commentsResolver;
