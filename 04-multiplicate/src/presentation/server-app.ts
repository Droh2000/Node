
// Estos son los parametros que requerimos
interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
}


// Clase que nos sirve para mantener estructurado la logica del servidor
export class ServerApp {

    // Cuando se llame este metodo queremos ver este mensaje
    // A este metodo le pasamos lo que vamos a usar de Yarg para solo usar esa libreria en una parte
    static run(options: RunOptions){
        console.log('Server Running');
        console.log({ options });
    }

}