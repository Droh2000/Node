// Como queremos crear algo para expandirlo, haremos que alguien solo herede esta clase
import { LogEntity, LogServerityLevel } from "../entities/log.entity";

//  Estas son las reglas de negocio de como queremos que funcione
// obligado el comportamiento que le definamos
export abstract class LogDatasource {

    // Aqui mandamos el LogEntity
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLogs( severityLevel: LogServerityLevel ): Promise<LogEntity[]>;

    // Esta es la implementacion de las reglas de negocio para los DataSources y todos tendran
    // que definir estos metodos
}