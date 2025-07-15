'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Answer.init({
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    selectedAnswer: DataTypes.STRING,
    isCorrect: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });

  Answer.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
Answer.belongsTo(models.Quiz, { foreignKey: 'quizId', as: 'quiz' });

User.hasMany(models.Answer, { foreignKey: 'userId', as: 'answers' });
Quiz.hasMany(models.Answer, { foreignKey: 'quizId', as: 'answers' });


  return Answer;
};