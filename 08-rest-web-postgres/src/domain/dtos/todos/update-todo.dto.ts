
export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly createdAt?: Date,
    ){}

    // Deberiamos de considerar las properties que queremos regresar, porque si algun elemento es undfined significa que ese dato no lo quremos actualizar
    // asi que vamos a actualizar solo las properties que tenemos pero tendremos varias combinaciones posibles
    // entonces solo vamos a actualizar las properties que nos manden
    get values() {
        // Queremos que la llave sea string y el contenido cualquier cosa
        const returnObj: {[key: string]: any} = {};
        // Si tenemos un valor se lo estabelecemos al objeto de arriba
        if( this.text ) returnObj.text = this.text;
        if( this.createdAt ) returnObj.createdAt = this.createdAt;

        return returnObj;// Aqui tenemos solo las properties que vamos a actualizar
    }

    static create( props: {[key: string]: any} ): [string?, UpdateTodoDto?]{
        const { id, text, createdAt } = props;
        let newCreatedAt = createdAt;// Por si viene un valor lo actualizamos

        // Si el ID no viene o no es numero
        if( !id || isNaN(Number(id)) ){
            return ['id must be a valid number'];
        }

        // Si no viene el texto no lo actualizamos y ya
        // Con el "createdAt" si tenemos que hacer la validacion si viene en formato Fecha sino lanzamos el error
        if( createdAt ){
            // El String que recibamos lo intentamos convertir a una fecha y nos da un error
            newCreatedAt = new Date( createdAt ); // Lo transformamos a Date
            if( newCreatedAt.toString() === 'Ivalid Date' ){
                return ['CreatedAt must be a valid date']; // ya el segundo argumento seria el undefined
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCreatedAt)];
    }
}