import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import User from "./user";
import Course from "./course";

interface EnrollmentAttributes {
  id: number;
  userId: number;
  courseId: number;
  status: "pending" | "approved";
  progress: number;
}

type EnrollmentCreationAttributes = Optional<EnrollmentAttributes, "id">;

class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentCreationAttributes>
  implements EnrollmentAttributes
{
  public id!: number;
  public userId!: number;
  public courseId!: number;
  public status!: "pending" | "approved";
  public progress!: number;
}

Enrollment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    progress: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Enrollment",
    tableName: "Enrollments",
  }
);

export default Enrollment;
