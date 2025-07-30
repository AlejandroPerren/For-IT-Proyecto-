import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';
import Quiz from './quiz';

interface AnswerAttributes {
  id: number;
  userId: number;
  quizId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

type AnswerCreationAttributes = Optional<AnswerAttributes, 'id'>;

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes {
  public id!: number;
  public userId!: number;
  public quizId!: number;
  public selectedAnswer!: string;
  public isCorrect!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Answer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    quizId: { type: DataTypes.INTEGER, allowNull: false },
    selectedAnswer: { type: DataTypes.STRING, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers',
  }
);


export default Answer;
