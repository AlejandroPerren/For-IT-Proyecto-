'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lesson.init({
    title: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    textContent: DataTypes.TEXT,
    sectionId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lesson',
  });

  Lesson.belongsTo(models.Section, { foreignKey: 'sectionId', as: 'section' });
Section.hasMany(models.Lesson, { foreignKey: 'sectionId', as: 'lessons' });

  return Lesson;
};