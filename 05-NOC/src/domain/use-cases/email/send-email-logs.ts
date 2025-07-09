import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    // Es una funcion con solo el argumento que requerimos y ya
    execute: (to: string | string[]) => Promise<boolean>;
}

// Si alguien quiere mandar LOGs del sistema que llame al caso de uso y se acabo el asunto
export class SendEmailLogs implements SendLogEmailUseCase {

    // Usualmente son los casos de uso los que llaman los repositorios
    constructor(
        // Asi como esta el codigo ocupamos guardar los LOGS si todo sale OK o NO pero nuestro "EmailService"
        // le inyectamos el FilesystemRepository para que guarde los LOGS entonces seria conveniente que en lugar de que el EmailService reciba el repositorio
        // reciba mejor el caso de uso para guardar el LOG
        // Aqui vamos a inyectar el Servicio (Enviar los correos) y el Repositorio (Para guardar los LOGs)
        private readonly emailService: EmailService, // Este podriamos omitirlo si solo le mandamos la funcion para mandar el correo ya que estamos mandando todo el servicio
        private readonly logRepository: LogRepository,
    ){}

    async execute( to: string | string[] ) {
        try {
            // Este es un caso de uso para mandar los Logs
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if ( !sent ) {
                throw new Error('Email log not sent');
            }

            // Mandamos el Log de que el correo fue enviado exitosamente
            const log = new LogEntity({
                message: `Log Email Sent`,
                level: LogServerityLevel.low,
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log);

            return true;
        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: LogServerityLevel.high,
                origin: 'send-email-logs.ts',
            });

            this.logRepository.saveLog(log);
            return false;
        }
    }
}