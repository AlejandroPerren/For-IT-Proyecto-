import {config} from 'dotenv';
import path from 'path';

type TypeMode = 'development' | 'production' | 'test';
/*
type TypeMode = 'development' | 'production' | 'test';: Define un tipo de TypeScript llamado TypeMode. Este es un "union type" que especifica que la variable mode solo puede tomar uno de estos tres valores de cadena: 'development', 'production' o 'test'. Esto proporciona una fuerte seguridad de tipos y evita errores por modos mal escritos.
*/

const mode : TypeMode = process.env.NODE_ENV as TypeMode || 'development';
/*
 const mode : TypeMode = process.env.NODE_ENV as TypeMode || 'development';:

process.env.NODE_ENV: Esta es una variable de entorno estándar en aplicaciones Node.js que indica el entorno en el que se está ejecutando la aplicación.

as TypeMode: Es una aserción de tipo de TypeScript. Le dice al compilador que trate el valor de process.env.NODE_ENV como si fuera del tipo TypeMode. Esto es necesario porque process.env siempre devuelve string | undefined, y TypeScript no sabe inherentemente que será uno de tus modos definidos.

|| 'development': Si process.env.NODE_ENV no está definido (es undefined o una cadena vacía), la variable mode por defecto será 'development'. Esto es una buena práctica para que tu aplicación siempre tenga un modo predeterminado.
 */

if(!['development', 'production', 'test'].includes(mode)) {
    throw new Error('Invalid mode');
};
/*
Si mode es algo diferente a 'development', 'production' o 'test', lanza un Error deteniendo la ejecución de la aplicación. Esto previene que la aplicación se inicie con una configuración de entorno desconocida o incorrecta.
*/

const envFile = `.env.${mode}`;
/*
 const envFile =.env.${mode};: Construye el nombre del archivo .env específico para el modo actual. Por ejemplo, si mode es 'development', envFile será ".env.development". Si es 'production', será ".env.production", etc.
 */

config({ path: path.join(__dirname,'environments', envFile) });
/*
 Esta línea hace que las variables definidas en ese archivo .env sean accesibles a través de process.env. 
 */

export const {
    PORT,
    NODE_ENV,
    BASE_URL
} = process.env;
/*
Al hacer export const { ... } = process.env;, estás exportando cada una de estas variables individualmente, lo que permite importarlas directamente en otros módulos.
 */