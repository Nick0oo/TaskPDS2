const { DataTypes: DataTypesComments } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Comments',
        {
            taskId: {
                type: DataTypesComments.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypesComments.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypesComments.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypesComments.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypesComments.DATE,
                allowNull: false,
            },
        },
    );
}

