import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Sections', [
      {
        title: 'Introducción',
        courseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Sections', {}, {});
  }
};
