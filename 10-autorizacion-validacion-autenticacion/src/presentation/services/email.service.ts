import nodemailer, { Transporter } from 'nodemailer';

// Este es el mismo codigo que vimos cuando requerimos mandar correos, pero ademas aqui vamos a corregir los problemas de las dependencias ocultas
export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {
    // Con este cambio evitamos la dependencia oculta
    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
    ) {
        this.transporter  = nodemailer.createTransport( {
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            }
        });
    }


    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {

        const sentInformation = await this.transporter.sendMail( {
            to: to,
            subject: subject,
            html: htmlBody,
            attachments: attachements,
        });

        // console.log( sentInformation );

        return true;
        } catch ( error ) {
        return false;
        }

    }
}
