const { DataTypes: DataTypesPriority } = require('sequelize');

module.exports = function (sequelize: any) {
    return sequelize.define(
        'Priorities',
        {
                id: {
                  type: DataTypesPriority.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                },
                name: {
                  type: DataTypesPriority.STRING, // ← CORRECTO
                  allowNull: false,
                  unique: true,
                },
              });
            
            };
            
    

