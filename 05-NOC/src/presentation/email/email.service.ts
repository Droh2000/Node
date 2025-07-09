// Este es nuestro servicio para enviar correos y ademas es el patron adaptador para 
// evitar que la libreria de NodeMailer sea implementada en un monton de lados
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

// Como esperamos varias opciones para especificar el mail entonces mejor nos creamos una interfaces
interface SendMailOptions{
    to: string,
    subject: string,
    htmlBody: string,
    // Falto definir para incluir archivos adjuntos
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

    async sendEmail(options: SendMailOptions):Promise<boolean> {

        const {to, subject, htmlBody } = options;

        try {
            // Enviamos el correo electronico
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });

            console.log(sentInformation);
            
            return true;    
        } catch (error) {
            // Podriamos usar nuestro sistema de Logs para registrar en caso que no se haya podido mandar el correo electoronico
            return false;
        }
    }
}
