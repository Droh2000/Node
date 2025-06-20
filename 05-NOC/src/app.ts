import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";

(async ()=>{
    main();
})();

function main(){
    //Server.start();
    // Ejemplo de como acceder a las variables (Gracias a la libreria tenemos el tipado las validaciones pero tambien si no especificamos
    // las variables que son obligatorias nuestra aplicacion se crashea y no arrancara)
    console.log( envs.PORT );
}