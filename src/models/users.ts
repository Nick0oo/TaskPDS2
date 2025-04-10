const { DataTypes: DataTypesUser } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
    'Users',
    {
        id: {
            type: DataTypesUser.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypesUser.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypesUser.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypesUser.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypesUser.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypesUser.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypesUser.DATE,
            allowNull: false,
        },
    },
)
};

