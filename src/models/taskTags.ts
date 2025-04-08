// models/taskTags.js
const { DataTypes : DataTypesTagsTask } = require("sequelize");

module.exports = (sequelize: any) => {
  return sequelize.define("TaskTags", {
    taskId: {
      type: DataTypesTagsTask.INTEGER,
      primaryKey: true,
    },
    tagId: {
      type: DataTypesTagsTask.INTEGER,
      primaryKey: true,
    },
  }, {
    timestamps: false, // opcional
  });
};
