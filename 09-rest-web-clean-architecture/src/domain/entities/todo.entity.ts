// Este archivo no esta relacionada a la base de datos, se asemeja mucho a lo que vamos a guardar
// sin embargo esto es lo que vamos a usar en la aplicacion y lo que despues vayamos a tener de base de datos es indiferente
// Si la base de datos cambia no tiene porque afecta mas que este archivo  Si esta entidad cambia no deberia verse afectada la BD tampoco
export class TodoEntity {
    // Es parecedio a lo que tenemos en la BD pero no es lo mismo
    constructor(
        public id: number,
        public text: string,
        public createdAt?: Date|null, // Manejamos estas posibilidades en la BD
    ){}

    // Si tiene un valor el campo nos regresara True
    get isCreatedAt(){
        return !!this.createdAt;
    }

    // Hay muchas maneras en las que podemos trabajar con la entidad, conforme salga la necesidad donde ocupemos crearnos algun tipo de maper
    // como transformar de un objeto a otro (Como lo que va a venir de Prisma a la entidad) tendremos que hacer un tipo de convercion

}