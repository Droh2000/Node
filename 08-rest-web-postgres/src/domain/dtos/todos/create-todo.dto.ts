
export class CreateTodoDto {

    // Especificamos los datos que requerimos para crear el elemento
    // para no obligar mandar los datos en cierto orden hacemos el constructor privado
    private constructor(
        public readonly text: string,
    ){}

    // Recibimos las properties que seria el objeto req.body
    // Lo que vamos a regresar, seria un string que indicaria si algo salio mal y lo otro la instancia de la clase
    // pero los dos son opcionales porque si nos sale uno entonces no saldra el otro.
    static create( props: {[key: string]: any} ): [string?, CreateTodoDto?]{
        // Ejecutamos validaciones de las properties
        const { text } = props;

        if( !text ) return ['Text property is required', undefined]; // Si el texto no viene
        
        // Si todo sale bien
        return [undefined, new CreateTodoDto(text)];
    }
}