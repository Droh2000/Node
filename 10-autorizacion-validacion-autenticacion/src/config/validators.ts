// Queremos verificar que si recibimos el usuario y la categoria, estos tienen que ser IDs de mongo, mongoose ya vienen con su implementacion para verificarlo
// pero como el DTO esta dentro de la carpeta de "domain" que es donde requerimos implementar la verificacion, nada de paquetes de tercero debe ir aqui, solo codigo de nosotros
// asi que nos creamos un archivo en la carpeta "config"

// Las librerias de terceros no deben estar acoplados en nuestro codigo
import mongoose from "mongoose";

export class Validators {

    static isMongoID( id:string ){
        return mongoose.isValidObjectId(id);
    }
}