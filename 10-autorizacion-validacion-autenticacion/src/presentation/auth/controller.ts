import { Request, Response } from 'express';

// El controlador solo debe de encargarse de dar la respuesta al cliente
// recibiendo la informacion y mandarsela a un servicio
// En el controlar vamos a definimos como manejamos las rutas definidas, aqui haremso inyeccion de dependencias y Handlers

export class AuthController {

    constructor(){}

    // Cada uno de estos metodos sera asignado a una ruta que definimos en "auth/routes.ts"
    registerUser = (req: Request, res: Response) => {
        res.json('registerUser');
    }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser');
    }

    validateEmail = (req: Request, res: Response) => {
        res.json('validateEmail');
    }

}