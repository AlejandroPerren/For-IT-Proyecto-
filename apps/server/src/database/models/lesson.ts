import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Section from './section';

interface LessonAttributes {
  id: number;
  title: string;
  videoUrl: string;
  textContent: string;
  sectionId: number;
  order: number;
}

type LessonCreationAttributes = Optional<LessonAttributes, 'id'>;

class Lesson extends Model<LessonAttributes, LessonCreationAttributes>
  implements LessonAttributes {
  public id!: number;
  public title!: string;
  public videoUrl!: string;
  public textContent!: string;
  public sectionId!: number;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lesson.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    videoUrl: { type: DataTypes.STRING },
    textContent: { type: DataTypes.TEXT },
    sectionId: { type: DataTypes.INTEGER, allowNull: false },
    order: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName: 'Lesson',
    tableName: 'Lessons',
  }
);


export default Lesson;
