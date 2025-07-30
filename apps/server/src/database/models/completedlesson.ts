import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';
import Course from './course';
import Lesson from './lesson';

interface CompletedLessonAttributes {
  id: number;
  userId: number;
  courseId: number;
  lessonId: number;
  completedAt: Date;
}

type CompletedLessonCreationAttributes = Optional<CompletedLessonAttributes, 'id'>;

class CompletedLesson extends Model<
  CompletedLessonAttributes,
  CompletedLessonCreationAttributes
> implements CompletedLessonAttributes {
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public lessonId!: number;
  public completedAt!: Date;
}

CompletedLesson.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    lessonId: { type: DataTypes.INTEGER, allowNull: false },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'CompletedLesson',
    tableName: 'CompletedLessons',
  }
);


export default CompletedLesson;
