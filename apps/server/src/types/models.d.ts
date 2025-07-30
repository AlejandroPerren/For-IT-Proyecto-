declare module '../database/models' {
  import { Model, Sequelize } from 'sequelize';

  export const User: typeof Model;
  export const Course: typeof Model;
  export const Enrollment: typeof Model;
  export const Quiz: typeof Model;
  export const Section: typeof Model;
  export const Lesson: typeof Model;
  export const Answer: typeof Model;
  export const CompletedLesson: typeof Model;

  export function initModels(sequelize: Sequelize): void;
}
