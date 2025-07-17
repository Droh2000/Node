import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
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

    Server.start();
    // Ejemplo de como acceder a las variables (Gracias a la libreria tenemos el tipado las validaciones pero tambien si no especificamos
    // las variables que son obligatorias nuestra aplicacion se crashea y no arrancara)
    console.log( envs.PORT );
}