import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Enrollments', [
      {
        userId: 3, // Alumno Ana
        courseId: 1,
        status: 'approved',
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Enrollments', {}, {});
  }
};
