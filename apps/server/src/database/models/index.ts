import sequelize from '../../config/database';
import User from './user';
import Course from './course';
import Enrollment from './enrollment';
import Answer from './answer';
import CompletedLesson from './completedlesson';
import Lesson from './lesson';
import Quiz from './quiz';
import Section from './section';

// Associations:

// User ↔ Course
User.hasMany(Course, { foreignKey: 'createdBy', as: 'courses' });
Course.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// User ↔ Enrollment ↔ Course
User.hasMany(Enrollment, { foreignKey: 'userId', as: 'enrollments' });
Enrollment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Course.hasMany(Enrollment, { foreignKey: 'courseId', as: 'enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// User ↔ Answer ↔ Quiz
User.hasMany(Answer, { foreignKey: 'userId', as: 'answers' });
Answer.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Quiz.hasMany(Answer, { foreignKey: 'quizId', as: 'answers' });
Answer.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

// Course ↔ Section ↔ Lesson ↔ Quiz
Course.hasMany(Section, { foreignKey: 'courseId', as: 'sections' });
Section.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Section.hasMany(Lesson, { foreignKey: 'sectionId', as: 'lessons' });
Lesson.belongsTo(Section, { foreignKey: 'sectionId', as: 'section' });

Lesson.hasMany(Quiz, { foreignKey: 'lessonId', as: 'quizzes' });
Quiz.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

// CompletedLesson
CompletedLesson.belongsTo(User, { foreignKey: 'userId' });
CompletedLesson.belongsTo(Course, { foreignKey: 'courseId' });
CompletedLesson.belongsTo(Lesson, { foreignKey: 'lessonId' });

export {
  sequelize,
  User,
  Course,
  Enrollment,
  Answer,
  CompletedLesson,
  Lesson,
  Quiz,
  Section,
};
