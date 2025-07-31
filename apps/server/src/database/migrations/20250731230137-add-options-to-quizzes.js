module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Quizzes', 'options', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {}, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Quizzes', 'options');
  },
};
