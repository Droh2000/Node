import { error } from "console";
import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
    // Para hacer la verificacion del token de autenticacion no requerimos aplicar inyeccion de dependencias
    // por eso no usamos el constructor y creamos metodos estaticos
    // Lo que recibimos del metodo es igual a un controlador de ruta y una funcion "next" para cuando todo sale Ok
    // llamamos esa funcion
    static async validateJWT( req: Request, res: Response, next: NextFunction) {
        // De la peticion que nos mandan tomamos el apartado de "Authorization" donde esta el token
        const authorization = req.header('Authorization');

        // Validaciones
        if( !authorization ) return res.status(401).json({error: 'No token provided'});
        // Si viene algo nos aseguramos que venga la palabra Bearer (En este caso verificamos si no empieza)
        if( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Inavalid Bearer token' });

        // Tomamos el Token
        // Sintaxis nueva de JS, el uso de "at(Posicion)"
        const token = authorization.split(' ').at(1) || '';// con '' nos aseguramos que siempre venga un valor para no tener undefined

        try {
            // Verificacion (Esto es parecido cuando validamos el correo electornido)
            // Gracias al tipo de dato generico especificamos el tipo de objeto que esperamos recibir
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if( !payload ) return res.status(401).json({ error: 'Invalid token' });

            // Buscamos el usuario por el Id que nos manda el payload
            const user = await UserModel.findById( payload.id );
            if( !user ) return res.status(401).json({ error: 'Invalid token - user' });

            // Si tenemos un usuario lo podemos poner donde queramos (En este caso en el Body)
            // req.body.user = user;
            // El incoveniente es que estariamos amarrando al "request" a que tenga las propiedades que vienen que en el usuario, nos gustaria que cuando ponemos
            // "body.user" sea una instancia de la entidad UserEntity
            req.body.user = UserEntity.fromObject(user);

            // Si todo sale Okey
            // Aqui le decimos que continue con lo que tenga siguiente, ya sea un middleware o una ruta del controlador
            next();
        } catch (error) {
            // Error que no sabemos que pueda pasar y aqui lo vemos y verificamos
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}