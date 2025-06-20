import { LogEntity, LogServerityLevel } from "../entities/log.entity";

/*
    Podrian pensar que solo copiamos y pegamos el codugo de "log.datasources.ts" a este archivo y es lo mismo
    La diferencia esta en que el Repository nos permite llamar metodos que se encuentran dentro del Datasources
    porque nosotros no llegamos directamente al Datasource sino que vamos a llegar mediane el repositorio
    Ya que en el Repository tenemos el Datasource que asi lo podemos cambiar facilmente porque cualquier otro
    y asi no tenemso que cambiar otra logica

    Los metodos del LogRepository y LogDatasource tienen el mismo nombre porque el Repository va a terminar llamando el Datasource
    por tanto son los mismos metodos que esperamos, solo la implementacion es la que varia
*/
export abstract class LogRepository {
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogServerityLevel ): Promise<LogEntity[]>;
}