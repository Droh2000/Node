// Las entidades las vamos a ver como algo que va a llegar a las base de datos
// tecnicamente los que guardamos en la base de datos

// Podriamos crearnos un tipo pero para variar nos creamos una enumeracion
// lo exportamos para despues evaluar basado en los datos que recibamos
export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    // Aqui tenemos lo que queremos registrar en la aplicacion
    // esto es lo que estariamos almacando en el sistema de logs
    public level: LogServerityLevel; // Este es nuestro nivel de errores de entidades
    public message: string;
    public createdAt: Date;

    // Hay diferentes formas de inicializar las propiedades
    constructor( message: string, level: LogServerityLevel ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    // Al mandar a llamar este metodo nos va a regresar una instancia del LogEntity (Esto es conocido como un FactoryConstructor)
    // Aqui estamos recibiendo cada linea del archivo de LOG como un String
    static fromJson = ( json: string ): LogEntity => {
        // Convertimos para obtener un objeto literal
        const { message, level, createdAt } = JSON.parse( json );
        // Podriamos verificar la data con validaciones pero no ponemos a crear la instancia directamente (ya que las propiedades son tipo ANY)
        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt ); // creamos la fecha basado en ese string para la instancia
        return log;
    }


    // Asi si en el futuro cambiamos nuestro origen de datos, no nos va a afectar porque ese origen va a mapear a esta entidad
    // y esto es lo que vamos a usar, no vamos a usar un objeto de la base de datos directamente
}
