module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Tasks", "statusId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Statuses",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Tasks", "statusId");
  }
};
