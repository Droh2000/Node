// Este es el archivo de inicializacion de la base de datos
import mongoose from 'mongoose';

// Para evitar las dependencias ocultas nos creamos esta interface, aqui se nos mondara todo lo requerido para conectarnos
// que podriamos tomar directamente de las variables de entorno pero eso nos generaria la dependencia oculta
interface ConnectionOptions {
    mongoUrl: string,
    dbName: string,
}

export class MongoDatabase {
    // Para la parte de la coneccion vamos a usar un metodo estatico a solo que requiramos una inyeccion de dependencias
    static async connect( options: ConnectionOptions ){
        // Ocupamos Mongosee y las variables entorno
        const { mongoUrl, dbName } = options;

        // Puede que la BD este ejecutandose o no
        try {
            // Hacemos la coneccion 
            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            });
            console.log('Mongo Connected');
        } catch (error) {
            console.log('Mongo connection error');
            throw error; // Aqui podriamos implementar el sistema de LOGS
        }
    }
}