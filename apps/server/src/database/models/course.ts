import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import User from './user';

interface CourseAttributes {
  id: number;
  title: string;
  description: string;
  isPublished: boolean;
  createdBy: number;
}

type CourseCreationAttributes = Optional<CourseAttributes, 'id'>;

class Course extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public isPublished!: boolean;
  public createdBy!: number;
}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    isPublished: { type: DataTypes.BOOLEAN, allowNull: false },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
  }
);

export default Course;
