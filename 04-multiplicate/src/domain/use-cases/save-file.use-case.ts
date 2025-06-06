// Este caso de uso es para crear el archivo, pero en este caso no es tanto aplicar la arquitectura limpia en este archivo
// porque nosotros deberiamos de mandar a llamar la ejecucion del archivo e inyectar la dependencia el cual indiquemos donde queremos guardar
// el archivo 
const fs = require('fs');

export interface SaveFileUseCase {
    // Solo lo llamamo "SaveFileOptions" porque ya sabemos que son las opciones de este archivo
    execute: ( options: Options ) => boolean;
}

export interface Options{
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    
    // Este archivo no deberia de crear el FileSystem, deberia de hacerlo un repositorio que es el que haria toda la logica
    constructor(
        /**
         *  Aqui debemos de tener la inyeccion de dependencias que deberia de ser el repositorio en el cual nosotros vamos a guardar la informacion
         *      repository: StorageRepository -> Aqui es donde indicamos donde los vamos guardar (Tambien se llaman DataSouce)
        */
    ){}

    execute({
        // Las variables por defecto les asignamos valores
        fileContent, 
        fileDestination = "outputs", 
        fileName = "table"
    }: Options): boolean {
        try{
            // El contenido lo almacenamos en un archivo de TXT
            // La implementacion de esta libreria deberia de ser aplicada con un Repositorio (PAra no mezclar conceptos lo dejamos asi)
            fs.mkdirSync(fileDestination, {recursive: true});// Recursiva en True por si tenemos varias subcarpetas dentro
            fs.writeFileSync(`${fileDestination}/tabla-${fileName}.txt`, fileContent);
            return true;
        }catch(error){
            console.log({error})
            return false;
        }
    }
}
