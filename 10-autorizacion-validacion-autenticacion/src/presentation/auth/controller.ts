import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';

// El controlador solo debe de encargarse de dar la respuesta al cliente
// recibiendo la informacion y mandarsela a un servicio
// En el controlar vamos a definimos como manejamos las rutas definidas, aqui haremso inyeccion de dependencias y Handlers

export class AuthController {

    // Inyectar el servicio encargado de la logica
    constructor(
        public readonly authService: AuthService,
    ){}

    // Manejar los errores
    private handleError = (error: unknown, res: Response) => {
        // Verificamos que el error sea una instancia del error personalizado
        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error' });
    }

    // Cada uno de estos metodos sera asignado a una ruta que definimos en "auth/routes.ts"
    registerUser = (req: Request, res: Response) => {
        // Tomamos el Body que es por donde nos mandan los datos, lo extraemos y lo transformamos en el DTO
        // donde obtenemos como primer elemento el error y el segundo la data
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});
        
        this.authService.registerUser(registerDto!)
            .then( (user) => res.json(user) ) // Aqui mandamos la respuesta
            .catch( error => this.handleError(error, res) );
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({error});
        
        this.authService.loginUser(loginUserDto!)
            .then( (user) => res.json(user) )
            .catch( error => this.handleError(error, res) );
    }

    validateEmail = (req: Request, res: Response) => {
        // Obtener el JWT cuando el usuario preciona el link del mensaje que le mandamos por correo
        const { token } = req.params;
        // En este metodo validamos el email con el token
        this.authService.validateEmail( token )
            .then( () => res.json("Email validated") )
            .catch( error => this.handleError(error, res) );
    }

}