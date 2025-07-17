import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource{

    async saveLog(log: LogEntity): Promise<void> {
        // Esto es una instancia del modelo de mongoose no de la entidad, esta instruccion es suficiente para crearlo y guardarlo
        const newLog = await LogModel.create(log);
        console.log('Mongo Log Created:', newLog.id);
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level:severityLevel
        });

        // Los "log" no es una coleccion de la entidad, no vamos a trabajar directamente con los LOGS
        // porque solo son propios de Mongo y Mongoose, asi que en la clase nos creamos un Factory function para convertirlo
        return logs.map( mongoLog => LogEntity.fromObject(mongoLog) );
    }

}