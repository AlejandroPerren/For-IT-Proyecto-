import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Curso de Node.js',
        description: 'Aprendé Node desde cero',
        createdBy: 2, 
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Courses', {}, {});
  }
};
