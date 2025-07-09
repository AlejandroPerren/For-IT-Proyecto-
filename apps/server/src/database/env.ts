// exportamos las variables de entorno para que puedan ser usadas en otros módulos
export const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
} = process.env;

// exportamos el objeto de configuración de la base de datos
export default {
    db : {
        host: DB_HOST || 'localhost',
        port: DB_PORT || 3306,
        username: DB_USERNAME || 'root',
        password: DB_PASSWORD || '',
        name: DB_NAME || 'test',
        dialect: DB_DIALECT || 'mysql'
    }
}