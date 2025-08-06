// Con el Dto verificamos el Body y transformarlo a la Data esperada
export class CreateCategoryDto{

    // Para que nadien nos cree la instancia directamente
    private constructor (
        public readonly name: string,
        public readonly available: boolean,
    ){}

    // Aqui es donde vamos a llamar el constructor, como argumento del metodo seria el Body de la peticion
    // lo que nos va a regresar sera un string que seria el mensaje en caso de tener un error o el Dto con la informacion
    static create( object: { [key: string]: any } ):[string?, CreateCategoryDto?]{
        const { name, available = false } = object;
        let availableBoolean = available;

        if( !name ) return ['Missing name'];        
        // El "available" si viene puede venir como un String, numerico, en si de varias maneras
        if( typeof available !== 'boolean' ){
            // Hacemos la conversion verificando que el String venga en 'true' caso contrario lo demas sera False
            availableBoolean = ( available === true );
        }

        return [undefined, new CreateCategoryDto(name, availableBoolean)];
    }
}