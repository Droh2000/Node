// Uso de Express.js

import { envs } from "./config/envs";
import { Approutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=> {
    main();
})();

function main(){
    console.log('Inicio de la App');
    // Levantamos el servidor
    const server = new Server({
        // Valores que se los mandamos de las variables de entorno
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        // Mandamos las rutas
        routes: Approutes.routes,
    });
    server.start();
}