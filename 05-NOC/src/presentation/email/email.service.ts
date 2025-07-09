// Este es nuestro servicio para enviar correos y ademas es el patron adaptador para 
// evitar que la libreria de NodeMailer sea implementada en un monton de lados
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

// Como esperamos varias opciones para especificar el mail entonces mejor nos creamos una interfaces
interface SendMailOptions{
    to: string | string[],
    subject: string,
    htmlBody: string,
    // Falto definir para incluir archivos adjuntos (Logs)
    attachments?: Attachment[],
}

interface Attachment {
    filename: string,
    path: string,
}

export class EmailService {
    // Este es el objeto que terminando mandando el correo electronico
    private transporter = nodemailer.createTransport({
        // Especificamos nuestra configuracion (La tomamos de las variables de entorno), asi si queremos cambiar alguno de estos valores
        // solo cambiamos la variable de entorno y no el codigo fuente
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    // A parte de mandar el correo queremos que este monitoreado por si sale bien o mal durante el envio
    constructor(
        // Vamos a hacer una inyeccion de dependencias que sera el repositorio
        // Hay varias formas de hacerlo y vamos a empezar de la forma mas facil
        private readonly logRepository: LogRepository
    ){}

    async sendEmail(options: SendMailOptions):Promise<boolean> {

        const {to, subject, htmlBody, attachments = [] } = options;

        try {
            // Enviamos el correo electronico
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            // console.log(sentInformation);
            // El problema de esta forma es que aqui tenemos que crear el LOG
            const log = new LogEntity({
                level: LogServerityLevel.low,
                message: 'Email Sent',
                origin: 'email.service.ts',
            });
            this.logRepository.saveLog(log);
            
            return true;    
        } catch (error) {

            const log = new LogEntity({
                level: LogServerityLevel.high,
                message: 'Email not Sent',
                origin: 'email.service.ts',
            });
            this.logRepository.saveLog(log);

            // Podriamos usar nuestro sistema de Logs para registrar en caso que no se haya podido mandar el correo electoronico
            return false;
        }
    }

    // Metodo para enviar el correo con archivos adjuntos (Que serian los LOGs generados)
    // Recibe a quien se lo queremos mandar (Por defecto la libreria soporta a alguien o a muchos usuarios por eso se puede un arreglo)
    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Este es un correo de prueba, mandado desde la aplicacion de Node</p>
            <p>Se podran ver los Logs adjuntos</p>
        `;
        // Adjuntamos cada uno de los LOGS que vamos a generar
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-all.log' },
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}
