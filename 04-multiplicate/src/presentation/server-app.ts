import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

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
        // Para crear los datos
        const table = new CreateTable().execute({ base, limit });
        // Para crear el archivo
        const wasCreated = new SaveFile()
                .execute({ 
                    fileContent: table,
                    fileDestination: `outputs/table-${base}`
                });
        
        if( showTable ) console.log(table);

        ( wasCreated ) ? console.log('File created') : console.log('File not created!!');
    }

}