const { DataTypes: DataTypesSubtask } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Subtask',
        {
            title: {
                type: DataTypesSubtask.STRING,
                allowNull: false,
                field: "name"
            },
            description: {
                type: DataTypesSubtask.STRING,
                allowNull: true,
            },
            completed: {
                type: DataTypesSubtask.BOOLEAN,
                allowNull: false,
                field: "status",
            },
            createdAt: {
                type: DataTypesSubtask.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypesSubtask.DATE,
                allowNull: false,
            },
        },
    );
}