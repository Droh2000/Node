// Nos creamos un caso de uso para poder usar los tres Datasources al mismo tiempo
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepository: LogRepository[], // Esto ahora sera un arreglo para poder usar varios repositorio
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){}

    private callLogs( log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            // No importa cuantos sean, los mandamos a llamar
            logRepository.saveLog(log);
        });
    }

    public async execute( url: string ): Promise<boolean>{
        try{
            const req = await fetch( url );
            if( !req.ok ){
                throw new Error(`Error on Check service ${ url }`);
            }

            const log = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogServerityLevel.low,
                origin: 'check-service.ts'
            });
            this.callLogs( log );
            this.successCallback && this.successCallback();
            return true;
        }catch( error ){
            const errorMessage = `${ url } Not Found. ${ error }`;
            const log = new LogEntity({ 
                message: errorMessage, 
                level: LogServerityLevel.high,
                origin: 'check-service.ts' 
            });
            this.callLogs(log);

            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}