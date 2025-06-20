import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasource';

export class LogRepositoryImpl implements LogRepository{
    
    // Aqui hacemos una inyeccion de dependencia de un LogDatasource (Asi no importa el tipo del Datasource solo con que implemente estos dos metodo
    // aqui solo recibimos algun tipo de datsosurce y llamar a ese metodo, asi podemos cambiar facilmente el Source)
    constructor(
        // De esta foroma lo recibimos como argumento y lo establecemos a la propiedad
        private readonly LogDatasource: LogDatasource,
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        this.LogDatasource.saveLog( log );
    }
    
    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        return this.LogDatasource.getLogs( severityLevel );   
    }

}