// Clase con la que vamos a crear errores personalizados
export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ){
        super(message);
    }

    // Para no estar creando instancias mandando los datos que nos pida el constructor y usar el NEW
    // Mejor vamos a crear Factory Constructor para que nos regrese instancias previemtne creadas
    // Con este metodo cuando requieramos un codigo de error BadRequest, solo lo llamamos mandando el mensaje y nada mas
    static badRequest(message: string){
        return new CustomError(400, message);
    }

    static unauthorized(message: string){
        return new CustomError(401, message);
    }

    static forbidden(message: string){
        return new CustomError(403, message);
    }

    static notFound(message: string){
        return new CustomError(404, message);
    }

    static internalServer(message: string){
        return new CustomError(500, message);
    }
}