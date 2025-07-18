// Las entidades las vamos a ver como algo que va a llegar a las base de datos
// tecnicamente los que guardamos en la base de datos

// Podriamos crearnos un tipo pero para variar nos creamos una enumeracion
// lo exportamos para despues evaluar basado en los datos que recibamos
export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions{
    level: LogServerityLevel
    message: string
    createdAt?: Date // Es opcional porque si no lo recibimos lo establecermos automaticamente
    origin: string
}

export class LogEntity {
    // Aqui tenemos lo que queremos registrar en la aplicacion
    // esto es lo que estariamos almacando en el sistema de logs
    public level: LogServerityLevel; // Este es nuestro nivel de errores de entidades
    public message: string;
    public createdAt: Date;
    // Esta propiedad nos va a indicar cual es el archivo (En este caso puede ser: LogEntity, EmailService, UseCase) para que en el Log
    // a parte de tener la informacion indicada queremos saber en cual archivo llamamos el Log
    // PERO si agregamos una propiedad tenemos que cambiar el constructor, para resolver esta modificacion podriamos crearnos otra Factory Function
    // que reciba los argumentos que esperamos y generar una nueva instancia de la entidad
    // En este caso la pusimos en el contructor y de ahi tendriamos que resolver los problemas en cascada
    public origin: string;

    // Hay diferentes formas de inicializar las propiedades
    //  constructor( message: string, level: LogServerityLevel, origin: string ){
    // Una de las recomendaciones del CleanCode es que cuando nosotros ya tenemos tres argumentos en un metodo o una funcion, es mejor que mandemos un objeto 
    // y ahi podemos meter las propiedades 
    constructor( options: LogEntityOptions){
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt; // Ya arriba especificamos que si no viene lo asignamos 
        this.origin = origin;
        // Despues de estos cambios tenemos que modificar en todos los lugares donde nos marquen errores
    }

    // Al mandar a llamar este metodo nos va a regresar una instancia del LogEntity (Esto es conocido como un FactoryConstructor)
    // Aqui estamos recibiendo cada linea del archivo de LOG como un String
    static fromJson = ( json: string ): LogEntity => {
        // Poniendo un breack point nos dimos cuentas que llegaba un JSON vacio, esto al cambiar de Mongo a Filesystem para almacenar los LOGs
        json = ( json === '' ) ? '{}': json;
        // Si viene vacio nos creara una entidad vacia y por tanto en el LOG solo nos saldra un String vacio
        // Para solucionar esto implementamos en el archivo "file-system.datasource.ts"

        // Convertimos para obtener un objeto literal
        const { message, level, createdAt, origin } = JSON.parse( json );
        // Podriamos verificar la data con validaciones pero no ponemos a crear la instancia directamente (ya que las propiedades son tipo ANY)
        const log = new LogEntity({ 
            message, 
            level,
            createdAt,
            origin, // Aqui iria el nombre del archivo donde se mandaria a llamar, por si ocurre un error ya sabemos donde paso
        });
        // log.createdAt = new Date( createdAt ); // creamos la fecha basado en ese string para la instancia
        return log;
    }

    // Manejar los Logs de Mongo y Moongose creando este mapper de un objeto a otro
    static fromObject = ( object: {[key: string]: any} ): LogEntity => {
        const { message, level, createdAt, origin } = object;

        const log = new LogEntity({
            message, level, createdAt, origin
        });

        return log;
    }

    // Asi si en el futuro cambiamos nuestro origen de datos, no nos va a afectar porque ese origen va a mapear a esta entidad
    // y esto es lo que vamos a usar, no vamos a usar un objeto de la base de datos directamente
}
