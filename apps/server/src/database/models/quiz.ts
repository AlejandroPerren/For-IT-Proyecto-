import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Lesson from './lesson';

interface QuizAttributes {
  id: number;
  lessonId: number;
  question: string;
  options: Record<string, any>;
  correctAnswer: string;
}

type QuizCreationAttributes = Optional<QuizAttributes, 'id'>;

class Quiz extends Model<QuizAttributes, QuizCreationAttributes>
  implements QuizAttributes {
  public id!: number;
  public lessonId!: number;
  public question!: string;
  public options!: Record<string, any>;
  public correctAnswer!: string;
}

Quiz.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lessonId: { type: DataTypes.INTEGER, allowNull: false },
    question: { type: DataTypes.STRING, allowNull: false },
    options: { type: DataTypes.JSON, allowNull: false },
    correctAnswer: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Quiz',
    tableName: 'Quizzes',
  }
);


export default Quiz;
