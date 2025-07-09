// Aseguramos que el CLI de Sequelize entienda TypeScript al ejecutar migraciones o semillas.
require('ts-node/register');

// Obtenemos las variables de entorno desde el archivo .env
const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = require('../env')

// Exportamos la configuración de la base de datos para que el CLI de Sequelize pueda leerla.
module.exports = {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
};