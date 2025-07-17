'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CompletedLessons", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Courses",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  lessonId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Lessons",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  completedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn("NOW"),
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
  }}