const { Tasks: TaskCommentModel, Users: UserCommentModel, Comments: CommentsModel } = require("../models");
const commentsResolver = {
    Query: {
        allComments: async () => {
            const comments = await CommentsModel.findAll({
                include: [{ model: Users, as: "users" }, { model: Tasks, as: "tasks" }],
            });
            return comments;
        },
        commentsById: async (_: any, { id }: { id: number }) => {
            return await CommentsModel.findByPk(id);
        },
    },
    Mutation: {
        createComments: async (_: any, { data }: { data: { [key: string]: any } }) => {
            return await CommentsModel.create(data);
        },
        updateComments: async (_: any, { id }: { id: number }, { data }: { data: { [ Key: string]: any }}) => {
            const [affectedCount] = await CommentsModel.update(data, {
                where: { id },
            });
            if (affectedCount > 0) {
                return await Comments.findByPk(id);
            }
            return null;
        },
        deleteComments: async (_: any, { id }: { id: number }) => {
            const deletedCount = await CommentsModel.destroy({
                where: { id },
            });
            return deletedCount > 0;
        },
    },
    Task: {
        comments: async (task: { id: number }): Promise<typeof Comments[]> => {
            return await CommentsModel.findAll({
                where: { taskId: task.id },
            });
        },
    },
    User: {
        comments: async (user: { id: number }): Promise<typeof Comments[]> => {
            return await Comments.findAll({
                where: { userId: user.id },
            });
        },
    },
    Comment: {
        user: async (comment: { userId: number }): Promise<typeof Users | null> => {
            return await Users.findByPk(comment.userId);
        },
        task: async (comment: { taskId: number }): Promise<typeof Tasks | null> => {
            return await Tasks.findByPk(comment.taskId);
        },
    },
};
module.exports = commentsResolver;