import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

// Para usar Mongo requerimos instalar: npm i mongoose
export class MongoDatabse {

    // Como no vamos a usar inyeccion de dependendencias vamos a crear el metodo estatico
    static async connect( options: Options ) {
        const { mongoUrl, dbName } = options;

        try {

            await mongoose.connect( mongoUrl, {
                dbName: dbName
            });

            return true;
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}