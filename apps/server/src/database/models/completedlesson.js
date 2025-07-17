'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const CompletedLesson = sequelize.define("CompletedLesson", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  CompletedLesson.associate = (models) => {
    CompletedLesson.belongsTo(models.User, { foreignKey: "userId" });
    CompletedLesson.belongsTo(models.Course, { foreignKey: "courseId" });
    CompletedLesson.belongsTo(models.Lesson, { foreignKey: "lessonId" });
  };

  return CompletedLesson;
};
