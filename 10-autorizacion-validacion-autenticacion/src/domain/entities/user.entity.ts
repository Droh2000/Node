// El objetivo de la entidad es para cuando queramos regresar un usuario sera esta entidad
// no vamos a regresar el modelo de mongoose para no tener una dependencia ni amarrar la aplicacion entera a mongoose

import { CustomError } from "../errors/custom.error";

// y asi solo dependemos de la entidad no de otro cambio repentino de la libreria o la BD que estamos usando
export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string, // Los opcionales siempre que tienen estar al ultimo
    ){}

    // Para crear con todas las propiedades para poder crear la entidad
    static fromObject( object: { [key:string]:any } ){
        // Desestrcutramos las propiedades que requerimos
        // pusimos "_id" porque en Mongo puede que venga asi porque asi se maneja
        const {id, _id, name, email, emailValidated, password, role, img, } = object;

        // Verificamos que tengamos toda la informacion al crear la instancia de la entidad
        // Si no nos mandan el id de mongo ni el id de nosotros (El objeto de mongoose puede que nos regrese uno de esos IDs)
        if( !_id && !id ){
            throw CustomError.badRequest('Missing Id');
        }

        if( !name ) throw CustomError.badRequest('Missing name');
        if( !email ) throw CustomError.badRequest('Missing email');
        if( emailValidated === undefined ) throw CustomError.badRequest('Missing emailValidated');// Si son booleanos lo hacemos de esta manera
        if( !password ) throw CustomError.badRequest('Missing password');
        if( !role ) throw CustomError.badRequest('Missing role');

        // Creamos la instancia con cualquiera de los IDs que recibamos
        return new UserEntity( id || _id, name, email, emailValidated, password, role, img );
    }
}