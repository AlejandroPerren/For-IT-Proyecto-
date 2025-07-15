'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
Quiz.init({
  lessonId: DataTypes.INTEGER,
  question: DataTypes.STRING,
  options: {
    type: DataTypes.JSON, 
    allowNull: false
  },
  correctAnswer: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Quiz',
});


  Quiz.belongsTo(models.Lesson, { foreignKey: 'lessonId', as: 'lesson' });
Lesson.hasMany(models.Quiz, { foreignKey: 'lessonId', as: 'quizzes' });


  return Quiz;
};