const { DataTypes: DataTypesSubtask } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Subtask',
        {
            name: {
                type: DataTypesSubtask.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypesSubtask.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypesSubtask.BOOLEAN,
                allowNull: false,
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