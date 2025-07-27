import { regularExps } from "../../../config";

export class RegisterUserDto {

    // El constructor es privado porque la unica manera de crear el Dto es usando el metodo estatico
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}

    // Recibimos cualquier tipo de objeto literal y lo que vamos a regresar es un arreglo que contiene 
    // un mensaje de error que es el String y la instancia de esta clase
    static create( object: { [key:string]:any } ): [string?, RegisterUserDto?]{
        const { name, email, password } = object;

        // Verificamos que los datos vengan (De esta forma tendremos una forma mejor de manejar la respuesta en el controlador)
        if( !name ) return['Missing name', undefined];
        if( !email ) return['Missing email', undefined];
        // Validamos que el email este bien escrito
        if( !regularExps.email.test( email ) ) return['Email is not valid', undefined];
        if( !password ) return['Missing password', undefined];
        if( password.length < 6 ) return['Password too short', undefined];

        // Si pasa todas las validaciones
        return [undefined, new RegisterUserDto(name, email, password)];
    }
}