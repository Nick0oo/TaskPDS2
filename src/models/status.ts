const { DataTypes: DataTypesStatus } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Status',
        {
                id: {
                  type: DataTypesStatus.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                },
                name: {
                  type: DataTypesStatus.STRING, // ← CORRECTO
                  allowNull: false,
                  unique: true,
                },
              });
            
            };