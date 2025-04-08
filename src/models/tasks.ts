const { DataTypes: DataTypesTask } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
    'Tasks',
    {
      projectId: {
        type: DataTypesTask.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypesTask.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypesTask.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypesTask.DATE,},
      statusID: {
        type: DataTypesTask.INTEGER,
        allowNull: false,
      },
      priorityId: {
        type: DataTypesTask.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypesTask.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypesTask.DATE,
        allowNull: false,
      },  
    }      
  );
}