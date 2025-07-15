import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashedpassword',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Profesor Uno',
        email: 'prof@example.com',
        password: 'hashedpassword',
        role: 'prof',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alumno Uno',
        email: 'student@example.com',
        password: 'hashedpassword',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Users', {}, {});
  }
};
