import { Validators } from "../../../config";

export class CreateProductDto {

    // La misma instancia se creara internamente desde la clase
    private constructor(
        // El nombre de las propiedades nos basamos en el modelo que tengamos
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: string,
        public readonly description: string,
        // El tipo de datos del usuario esta relacionado con su respectivo DTO porque es la informacion que estamos esperando recibir
        // no esperamos que nos mande el usuario, solo esperamos tenerlo para poder crear un producto
        public readonly user: string, // La idea es que sea un String donde se va a contener el ID
        public readonly category: string, // esta es la misma idea del ID
    ){}

    static create( props: { [key: string]: any } ): [string?, CreateProductDto?]{
        const {
            name,
            available,
            price,
            description,
            user,
            category,
        } = props;

        // Verificacion de como viene la data (Para esto siempre nos guiaremos del modelo y creemos esta capa de proteccion)
        if( !name ) return ['Missing name'];
        if( !user ) return ['Missing user'];
        if( !Validators.isMongoID(user) ) return ['Invalid User Id']; // Verificamos que los datos esten en el formato esperado
        if( !category ) return ['Missing category'];
        if( !Validators.isMongoID(category) ) return ['Invalid Category Id']; // Verificamos que los datos esten en el formato esperado

        return [
            undefined,
            new CreateProductDto(
                name,
                // Si viene cualquier valor, por ejemplo un String lo consideramos con string si no es False y con la doble negacion sigue siendo False
                !!available,// Esta es una forma rapida, igual podemos evaluar como en otros DTOs
                price,
                description,
                user,
                category,
            )
        ];
    }
}
