import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Answers', [
      {
        userId: 3, // Alumno Ana
        quizId: 1,
        selectedAnswer: 'Un entorno de ejecución de JS',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Answers', {}, {});
  }
};
