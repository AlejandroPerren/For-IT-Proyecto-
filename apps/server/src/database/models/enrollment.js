'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enrollment.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enrollment',
  });

  Enrollment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
Enrollment.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });

User.hasMany(models.Enrollment, { foreignKey: 'userId', as: 'enrollments' });
Course.hasMany(models.Enrollment, { foreignKey: 'courseId', as: 'enrollments' });


  return Enrollment;
};