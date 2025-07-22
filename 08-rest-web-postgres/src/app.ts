import { envs } from "./config/envs";
import { Approutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async()=> {
    main();
})();

function main(){
    console.log('Inicio de la App');
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: Approutes.routes,
    });
    server.start();
}