import { CreateTable } from "../domain/use-cases/create-table.use-case";

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
    static run({ base, limit, showTable }: RunOptions){
        console.log('Server Running');
        // Aqui queremos ejecutar los casos de uso
        // Aqui hariamos la inyeccion de dependencias y llamamos el metodo correspondiente pasandole los datos
        const table = new CreateTable().execute({ base, limit });
        if( showTable ) console.log(table);
    }

}