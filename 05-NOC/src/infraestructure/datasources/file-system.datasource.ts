import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

// Aqui es donde hacemos la implementacion del Datasource que en este caso es solo para el Filesystem
export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/'; // Esta es la ruta donde estaran guardados los Paths
    // Por nuestra logica implementada, tendremos tres diferentes de directorios por cada tipo de Log que especificamos en el ENUM
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    // Asegurarnos que si no tenemos los directorios hay que crearlos
    // y nos aseguramos que los archivos LOG existan qie al crear la instancia de la clase se asegurara de su existencia
    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        // Verificamos si no existe el directorio para crearlo
        if( !fs.existsSync( this.logPath ) ){
            fs.mkdirSync( this.logPath );
        }

        // Para no tener que estar implementando esta logica por cada uno de los archivos, lo vamos a hacer de forma elegante
        /*if( fs.existsSync(this.allLogsPath) ) return;
            fs.writeFileSync( this.allLogsPath, '' );*/
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if( fs.existsSync( path ) ) return; // si existe la ruta no hacemos nada
            fs.writeFileSync( path, '' ); // Lo creamos e insertamos en blanco
        });
    }

    async saveLog( newLog: LogEntity): Promise<void> {

        // Como copiamos varias veses esta linea, para no dependen que en el futuro al midificarla lo hagamos en varios lugares,
        // lo implementamos como duro en un solo lugar
        const logAsJson = `${ JSON.stringify(newLog) }\n`;

        // Agregaremos el LOG basado en el nivel jerarquico de alerta, de acuerdo a nuestra logica todos los LOGS los vamos a guardar
        // dentro de "allLogsPath" (Por eso le cambiamos el nombre)
        // Con el metodo "appendFilesSync" es para agregar una linea al final y asi no tenemos que recorrer todo el archivo para leerlo
        // aqui directamente guarda el contenido al final, el contenido lo guardamos como un JSON y al final le damos salto de linea
        fs.appendFileSync( this.allLogsPath, logAsJson);

        // Verificamos el nivel jerarquico del LOG usando el ENUM que creamos
        if( newLog.level === LogServerityLevel.low ) return;

        if( newLog.level === LogServerityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson);
        }
    }

    getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}