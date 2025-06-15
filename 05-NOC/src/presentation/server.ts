import { CronService } from "./cron/cron-service";

export class Server {

    // Este es el punto de inicio de nuestra aplicacion
    // En este metodo vamos definiendo los jobs, despues vamos a leer la base de datos y entre otras configuraciones relacionadas
    public static start(){
        console.log('Server started...');

        // El CronSeervice usa el "ChildProcess" donde puede crear otro proceso como multihilos separados
        // para cuando tenemos que estar ejecutando varios Jobs a la vez
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date = new Date();
                console.log('5 seconds', date);
            }
        );
    }
}