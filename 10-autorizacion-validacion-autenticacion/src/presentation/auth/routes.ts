// Aqui estan las rutas de la autenticacion
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../services/';
import { envs } from '../../config';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL,
    ); // Injectar el servicio por medio de la inyeccion de dependencia al AuthService
    const authService = new AuthService( emailService );// El servicio tiene que estar inicializado y lo hacemos en el lugar donde lo requerimos

    // Del controlador sacamos lo que haran las rutas
    const controller = new AuthController(authService);
    
    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    // La idea de este Token es asegurarnos de que nosotros lo hayamos firmado, en caso que si, vamos a verificar el payload
    // Por el URL estamos recibiendo el Token
    router.get('/validate-email/:token', controller.validateEmail );

    return router;
  }
}