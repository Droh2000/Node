import { CronJob } from 'cron';

export class Server {

    // Este es el punto de inicio de nuestra aplicacion
    public static start(){
        console.log('Server started...');

        // Esto lo pusimos aqui como muestra de ejemplo
        const job = new CronJob(
            '*/3 * * * * *', // cronTime (Aqui cambiamos segun por cada cuanto tiempo queremos ejecutarlo)
            () => {
                const date = new Date();
                console.log('3 second', date);
            },
        );
        job.start();
    }
}