// Uso de Express.js

import { Server } from "./presentation/server";

(async()=> {
    main();
})();

function main(){
    console.log('Inicio de la App');
    // Levantamos el servidor
    const server = new Server();
    server.start();
}