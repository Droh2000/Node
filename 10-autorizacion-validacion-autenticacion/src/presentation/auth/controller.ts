import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

// El controlador solo debe de encargarse de dar la respuesta al cliente
// recibiendo la informacion y mandarsela a un servicio
// En el controlar vamos a definimos como manejamos las rutas definidas, aqui haremso inyeccion de dependencias y Handlers

export class AuthController {

    // Inyectar el servicio encargado de la logica
    constructor(
        public readonly authService: AuthService,
    ){}

    // Cada uno de estos metodos sera asignado a una ruta que definimos en "auth/routes.ts"
    registerUser = (req: Request, res: Response) => {
        // Tomamos el Body que es por donde nos mandan los datos, lo extraemos y lo transformamos en el DTO
        // donde obtenemos como primer elemento el error y el segundo la data
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});
        
        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user) ) // Aqui mandamos la respuesta
            
    }

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser');
    }

    validateEmail = (req: Request, res: Response) => {
        res.json('validateEmail');
    }

}