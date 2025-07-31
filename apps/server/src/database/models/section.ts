import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import Course from './course';

interface SectionAttributes {
  id: number;
  title: string;
  courseId: number;
}

type SectionCreationAttributes = Optional<SectionAttributes, 'id'>;

class Section extends Model<SectionAttributes, SectionCreationAttributes>
  implements SectionAttributes {
  public id!: number;
  public title!: string;
  public courseId!: number;
}

Section.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Section',
    tableName: 'Sections',
  }
);


export default Section;
