const { DataTypes: DataTypesProject } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Projects',
        {
            title: {
                type: DataTypesProject.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypesProject.STRING,
                allowNull: false,
            },
            createdBy: {
                type: DataTypesProject.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypesProject.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypesProject.DATE,
                allowNull: false,
            },
        },
    );
}