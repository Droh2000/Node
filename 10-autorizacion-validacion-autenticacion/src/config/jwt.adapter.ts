import jwt, { SignOptions } from 'jsonwebtoken';

// Solo en este archivo vamos a tener la dependencia directa del paquete
export class JwtAdapter {
    // Como no requerimos la inyeccion de dependencia trabajamos con metodos estaticos

    // Al metodo le especificamos el payload que le vamos a mandar y lo que va a durar el token
    static async generateToken( payload: any, duration: string = '2h' ){
        // Dentro de esta promesa vamos a ejecutar el proseo del JWT
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration } as SignOptions, (err, token) => {
                if ( err ) return resolve(null);         
                resolve(token) // Si tenemos un token
            });
        });
    }

    static validateToken(token: string){

    }
}