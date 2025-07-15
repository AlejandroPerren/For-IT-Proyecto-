'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Section.init({
    title: DataTypes.STRING,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Section',
  });

  Section.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
  Course.hasMany(models.Section, { foreignKey: 'courseId', as: 'sections' });


  return Section;
};