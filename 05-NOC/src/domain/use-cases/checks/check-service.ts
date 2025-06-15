// Este es uno de nuestros casos de uso (Un codigo que esta especializado en una tarea)
// Aqui es donde vamos a verificar algun servicio de la aplicacion con el que podemos probar si esta todo OK o hay fallos

// Para mejora la legibilidad y demostrar como funciona el codigo creamos las interfaces
interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase{

    // El "url" es el que queremos provar del servicio web
    // La funcion nos regresa un Boolean segun si el servicio esta arriba o esta caido, pero podriamos pensar que hacer si esta caido
    // o donde podemos tolerara que ocurran varios fallos del servicio pero si pasan mas de los tolerados entonces ya que nos informe
    // Este metodo no es estatico porque si requerimos inyectarle dependencias
    public async execute( url: string ): Promise<boolean>{
        try{
            // Veriricamos que una peticion se haya ejecutado correctamente
            const req = await fetch( url );
            if( !req.ok ){ // Si no esta bien
                // La idea de este Throw es manejar toda la Excepcion en un mismo lugar (Todo caera dentro del catch)
                throw new Error(`Error on Check service ${ url }`);
            }
            console.log(`${url} is ok`)
            return true;
        }catch( error ){
            console.log(`${error}`);
            return false;
        }
    }
}