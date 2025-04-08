const { DataTypes: DataTypesTags } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Tags',
        {
                id: {
                  type: DataTypesTags.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                },
                name: {
                  type: DataTypesTags.STRING, // ← CORRECTO
                  allowNull: false,
                  unique: true,
                },
              });
            
            };