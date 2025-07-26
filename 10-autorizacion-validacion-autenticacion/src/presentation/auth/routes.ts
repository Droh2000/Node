// Aqui estan las rutas de la autenticacion
import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    // Del controlador sacamos lo que haran las rutas
    const controller = new AuthController();
    
    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    // La idea de este Token es asegurarnos de que nosotros lo hayamos firmado, en caso que si, vamos a verificar el payload
    // Por el URL estamos recibiendo el Token
    router.get('/validate-email/:token', controller.validateEmail );

    return router;
  }
}