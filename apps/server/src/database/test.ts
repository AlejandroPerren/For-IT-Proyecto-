// database.test.ts
import { Sequelize, DataTypes, QueryInterface } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

export const queryInterface = sequelize.getQueryInterface();
export const DataTypesTest = DataTypes; // Exporta DataTypes para que pueda ser usado en el test
export const sequelizeInstance = sequelize;

// Opcional: una función para sincronizar el modelo (útil si también tienes modelos para probar)
export const syncDatabase = async () => {
  await sequelize.sync({ force: true }); // `force: true` para recrear las tablas en cada prueba
};

// Opcional: una función para cerrar la conexión de la base de datos
export const closeDatabase = async () => {
  await sequelize.close();
};