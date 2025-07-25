'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isPublished: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate = function(models){
    Course.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    })
  }

  return Course;
};