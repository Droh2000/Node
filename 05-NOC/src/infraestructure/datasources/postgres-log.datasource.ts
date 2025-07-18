import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prismaclient = new PrismaClient();

// Conversion de los Level que creamos en mayusculas a minusculas
const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource{
    
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        // Con esto creamos el LOG en la BD
        const newLog = await prismaclient.logmodel.create({
            data: {
                ...log,
                //level
            }
        });
    }

    async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        // Sacamos la enumeracion de Postgres
        const level = severityEnum[severityLevel];

        const dbLogs = await prismaclient.logmodel.findMany({
            where: {
               //level: level
            }
        });

        return dbLogs.map( dbLog => LogEntity.fromObject(dbLog) );
    }
}