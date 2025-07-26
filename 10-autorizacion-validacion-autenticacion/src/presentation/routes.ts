import { Router } from 'express';
import { AuthRoutes } from './auth/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // Las rutas sera esta como principal y luego vendra la parte que definimos en "routes.ts"
    router.use('/api/auth', AuthRoutes.routes );



    return router;
  }


}

