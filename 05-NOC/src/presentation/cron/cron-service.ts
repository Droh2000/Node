// Implementacion del patron adaptador
// Como esto esta relacionado al proceso de consola, lo colocamos dentro de la carpeta de presentation
import { CronJob } from 'cron';

// Tipos de datos que espera recibir la fucion
type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    // Como no ocupamos hacer una Inyeccion de dependencias este metodo tendria que ser normal
    // pero como solo ocupamos llamarlo lo podemos crear estatico
    // Una recomendacion que nos da CleanCode es que cuando mandamos mas de tres argumentos a una fucion entonces mandamos un objeto
    static createJob( cronTime: CronTime, ontick: OnTick ): CronJob {
        // Esto lo pusimos aqui como muestra de ejemplo
        const job = new CronJob(
            cronTime, // cronTime (Aqui cambiamos segun por cada cuanto tiempo queremos ejecutarlo)
            ontick,
        );
        job.start();

        // Lo regresamos para cuando por fuera lo queramos manipular
        return job;
    }
}