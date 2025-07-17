import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async ()=>{
    main();
})();

async function main(){
    // Antes de ejecutar el servior nos aseguramos de tener la coneccion correctamente
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // No van a permanecer aqui las instrucciones pero vamos a probarlas
    // Crear una coleccion que seria igual a las tablas en una BD relacional y un Documento seria un Registro
    /*const newLog = await LogModel.create({
        // Aqui definimos lo que requerimos para crear un registro que vaya a almacenarse a la coleccion de logs
        message: 'Test Message desde Mongo',
        origin: 'App.ts',
        level: 'low',
    });

    await newLog.save();*/

    // Para obtener los registros (Por defecto nos los da en formato de arreglo)
    // const logs = await LogModel.find();
    // console.log(logs);

    Server.start();
    // Ejemplo de como acceder a las variables (Gracias a la libreria tenemos el tipado las validaciones pero tambien si no especificamos
    // las variables que son obligatorias nuestra aplicacion se crashea y no arrancara)
    console.log( envs.PORT );
}