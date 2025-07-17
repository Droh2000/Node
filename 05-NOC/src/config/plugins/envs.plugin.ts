import 'dotenv/config'; // Este es para tomar las variables de entorno
import * as env from 'env-var'; // Este es para hacer las validaciones

export const envs = {
    // Variable de entorno que queremos convertir su tipo de dato al valor que le corresponde (Asi tenemos tipado extricto)
    PORT: env.get('PORT').required().asPortNumber(), // "asPortNumber()" ya indicamos que esperamos un puerto
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(), // Aqui podriamos usar una expreccion regular para detectar como debe ser la contrasena
    PROD: env.get('PROD').required().asBool(),

    // Mongo DB
    MONGO_URL: env.get('MONGO_URL ').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),
}