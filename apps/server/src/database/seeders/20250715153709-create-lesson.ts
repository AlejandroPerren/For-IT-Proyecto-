import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Lessons', [
      {
        title: '¿Qué es Node?',
        videoUrl: 'https://youtube.com/fake-url-nodejs',
        textContent: 'Node.js es un entorno de ejecución para JS...',
        sectionId: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Lessons', {}, {});
  }
};
