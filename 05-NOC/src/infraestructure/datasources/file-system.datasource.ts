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

    /*
        Se nos va a estar generando archivos LOGs en una carpeta LOGs donde dentro vamos a tener formato JSON (Pero no es JSON) con cada una de las propiedades que especificamos
        y por cada LOG que se vaya a generar se va a estar actualizando el archivo agregandole un salto de linea por cada registro, este archivo tendria el formato de un objeto de JS
        pero cuando estamos trabajando con el metodo "gertLogs" requerimos regresar el "LogEntity" como un arreglo (regresar esa entidad) que las propiedades son las mismas pero no es
        lo mismo que tener el tipo de datos como la Entidad porque ahi tenemos acceso a metodos y en el objeto no tenemos nada, por eso hacemos la conversion

        Este metodo de abajo es para implementar la logica de recorrer el archivo y regresarlo como un LOG
        el proceso es identico para cada nivel solo cambia la ruta
    */
    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' );// Aqui tenemos un String que contiene todo lo almacenado por el archivo
        // Para crearle una instancia por cada linea, esto lo implementamos en la entidad para hacer la conversion mas facilmente pero lo de recorrer linea a linea 
        // si lo vamos a implementar aqui, identificado que al final tenemos un '\n' para cortar por linea
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );
        return logs;
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        // Segun el nivel que tengamos en el "severityLevel"
        switch( severityLevel ){
            case LogServerityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogServerityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogServerityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            // Ponemos el Default mas que todo para que esto sea expandible por si se quiere agregar mas niveles
            default:
                throw new Error(`${ severityLevel } not implemented`);
        }
    }
}