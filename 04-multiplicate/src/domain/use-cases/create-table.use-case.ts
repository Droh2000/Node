// El objetivo de este archivo es crear los datos 

// Creamos reglas para indicar como debe de funcionar el caso de uso y definir ahi los argumentos que podemos esperar
export interface CreateTableUseCase {
    // Reglas de negocio que obligatoriamente forzaremos a que la clase las implemente
    // Queremos aplicar principios que nos permiten expandir los objetos sin modificar el codigo interno
    execute: ( options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTable{
    constructor(
        /**
         * En TS (Y que en JS es diferente) se trabaja con los constructores
         * porque nos ayuda en la reutilizacion del codigo y en la felixibilidad del mismo que es la Inyeccion de Dependencias
         * en el cual podemos inyectarle a este caso de uso la forma de crear las cosas o las dependencias externas
        */
    ){}

    // Cada caso de uso va a tener este metodo, aqui es donde vamos a ejecutar los casos de uso
    // La ventaja de usar DI (Dependency Injection) es que dentro de este metodo vamos a poder usar las dependencias que vinen del mundo exterior
    // Asi separamos que cada archivo haga una tarea y la haga bien
    // Tambien tenemos la posibilidda de que en este metodo queramos saber la base, el limite y otra informacion que requerimos por ejemplo los datos que ocupamos para crear la tabla
    execute({ base, limit = 10 }: CreateTableOptions){
        // Creamos los datos que vamos a mandar despues a un archivo
        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${ base } X ${ i } = ${ base * i }\n`
        }
        return outputMessage;
    }

}