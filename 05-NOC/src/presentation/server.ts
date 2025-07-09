import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Instancia para mandarsela a todos los UseCases que puedan reqeurir este repositorio (Aqui creamos todas las instancias de las implementaciones)
const fileSystemLogRepository = new LogRepositoryImpl(
    // Este es nuestro origen de datos que cuando se manda a llamar verifica si existen los archivos y toda la logica
    // Aqui es donde podremos cambiar segun donde queremos almacenar los datos
    new FileSystemDatasource()
);

export class Server {

    // Este es el punto de inicio de nuestra aplicacion
    // En este metodo vamos definiendo los jobs, despues vamos a leer la base de datos y entre otras configuraciones relacionadas
    public static start(){
        console.log('Server started...');

        // Aqui es donde vamos a mandar el email (Lo hizimos en instancia y no en metodo estatico porque despues haremos una inyeccion de dependencias)
        //const emailService = new EmailService( fileSystemLogRepository );
        //emailService.sendEmailWithFileSystemLogs(
        //    ['droh2000@gmail.com']
        //);

        // El CronSeervice usa el "ChildProcess" donde puede crear otro proceso como multihilos separados
        // para cuando tenemos que estar ejecutando varios Jobs a la vez
        /*CronService.createJob(
            '* / 5 * * * * *',
            () => {
                // Llamamos nuestro caso de uso cada 5 segundo que por ahora sera a este servicio
                // Despues de la implementacion de la inyeccion de dependencias le mandamos las funciones correspondientes
                const url = 'https://google.com';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} success`),
                    ( error ) => console.log( error ),
                ).execute(url);

                // Consumir el Endpoint que creamos con la libreria de JSON-SERVER (Esta en la carpeta 06)
                // Asi podemos bajar el servicio y veremos como entra la parte del Catch y verificacion del error
                // si lo volvemos a levantar el servicio veremos que vuelve a detectar que todo esta OK
                // new CheckService().execute('http://localhost:3000');
            }
        );*/
    }
}