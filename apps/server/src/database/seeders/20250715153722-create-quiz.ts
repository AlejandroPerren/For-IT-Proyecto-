import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Quizzes', [
      {
        lessonId: 1,
        question: '¿Qué es Node.js?',
        options: JSON.stringify([
          'Un framework de JavaScript',
          'Un entorno de ejecución de JS',
          'Un sistema operativo',
          'Una base de datos'
        ]),
        correctAnswer: 'Un entorno de ejecución de JS',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Quizzes', {}, {});
  }
};
