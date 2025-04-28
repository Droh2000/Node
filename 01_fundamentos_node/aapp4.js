// Orden de ejecucion
// Podriamos pensar que asi como estan lineas se van a ejecutar una detras de otra, siguiendo el mismo orden

console.log('Inicio de programa');

setTimeout( () => {
    console.log('Primer Timeout');
}, 3000 );


setTimeout( () => {
    console.log('Segundo Timeout');
}, 0 );


setTimeout( () => {
    console.log('Tercer Timeout');
}, 0 );


console.log('Fin de programa');

// Con los TimeOut configurados en 3000, 0, 0. Se ejecutaron las lineas como:
// Inicio de Programa
// Fin de Programa
// Segundo Timeout
// Tercer Timeout
// Primer Timeout

// Con los TimeOut configurados en 3000, 100, 0. Se ejecutaron las lineas como:
// Inicio de Programa
// Fin de Programa
// Tercer Timeout
// Segundo Timeout
// Primer Timeout

// Con los TimeOut configurados en 3000, 1, 0. Se ejecutaron las lineas como:
// Inicio de Programa
// Fin de Programa
// Segundo Timeout
// Tercer Timeout
// Primer Timeout
// (Esto puede varirar mucho segun la rapidez de nuestra computadora)

// Explicacion
/*
    Even Loop y code Execution

        Si tenemos los siguientes codigos:
            
            setTimeout( cb1, 0 );
            Promise.resolve().then( cb2 );
            process.nextTick( cb3 );
            fs.readFile( 'file.txt', cb4 );
            setImmediate( cb5 );

        Si todos estos procedimientos se dispararan al mismo tiempo ¿Quien se ejecuta Primero?

            Esto lo decide el EventLoop quien lo decide, Node se tuvo que enfrentar a que JS por defecto es Blocking y single-threaded
            de que casi todo el codigo de JS es bloqueante (Espera a que se termine una tarea para poder continuar con la demas)
            y Js solo sigue un hilo de ejecucion

        Tenemos 3 principales componentes de Node
            - Dependencias Externas
            - Caracteristicas de C++
            - Librerias de JS que se conectan con C++ desde nuestro codigo
        
        Cuando creamos un codigo de Node pasa por esas 3 caracteristicas

        Tenemos la libreria de Libuv que le permite a Node poder trabajar en tareas asyncroncas, Callback y todo lo que podemos hacer en un servidor 
        en un Nube, el cual puede recibir miles de peticiones diarias

        Ejecucion del Codigo

            Cuando mandamos a ejecutar nuestro archivo donde tenemos la logica, Node por defecto crea la funcion Global (En otros lenguajes es como el Main())
            esa funcion global nos da ciertas variables de entorno, ya sabe donde se esta ejecutando y otras propiedades.
            Despues de recorrer todo el archivo y encontrar referencias, Node toma la primera linea y la pone en el Call Stack, donde registra la linea,
            la ejecuta y la elimina, despues continua asi con las demas lineas, al llegar al final del archivo, sale de la funcion global

            Pero si tenemos lineas de codigo Bloqueantes como cuando leimos un archivo
                En este caso al ejecutar y registrar la linea que abre el archivo, despues de eso, lo pasa al Libuv, este se encarga de ejecutar estas tareas asincronas
                asi despues de que la logica la tome Libuv, elimina este codigo del Call Stack y se continua con la siguiente logica
                (Siempre se ejcutara primero todo el codigo que es Sincrono, se ejecuta en secuencia) asi que se ejecutara todo el codigo hasta terminar la logica pero 
                se quedan las tareas pendientes que estan siendo manejadas por Libuv que cuando las termina, las pasa al Call Stack, ahi se ejecuta y se elimina, al no tener
                nada pendiente se cierra la funcion global

            Lo que pasaba en el codigo de arriba (De este archivo)
                llega a la primera linea que era el console log, se recibe y se ejecuta en la funcion global y se elimina
                despues llega el primer setTimeOut al que le decimos que se va a ejecutar en 3 segundos, se manda el Libuv el callback interno
                luego llega el otro setTimout que tiene 0 milesimas de segundos, se ejecuta se manda al Libuv y se elimina de la funcion global
                con el siguiente setTimeout pasa exactamente los mismo
                despues llegamos al ultimo console log
                
                En este punto ya no hay mas tareas asincronas en el archivo pero hay codigo pendiente en el Libuv, lo que ocurre es que los callback que estaba dentro de los SetTimeOut
                que ya esten completados los va a termina de la manera First in/ First Out para los que ya hayan terminado, entonces
                    - El segundo Callback se termino primero, se manda a la funcion Global, se ejecuta y se elimina
                    - El siguiente es el Callback que entro despues con las 0 milesimas
                    - Por ultimo Libuv queda al pendiente que pase el tiempo establecido en el SetTimeout y ahi como ya no nada mas, lo manda a la funcion global y lo ejecuta y termina
                
                En una parte pusimos el setTimeout en 1 milesima de segundo y otro en 0 milesimas de segundos, esto paso que en el Libuv tenuamos los tiempos de 
                    0 ms, 1 ms y 3 ms, esto para cada callback respectivo, hay que fijarse cual de todos estos entro primero al Libuv, lo que pasa tiempo es el tiempo
                    que tarda en ejecutar la demas logica asyncrona porque en lo que termina eso, el timpo en de los SetTimeout ya avanzo dentro del Libuv, en este punto ya dos
                    callback se resolvieron y llegaron a 0 ms, la forma que los saca Libuv es empezando por el primero que entro (Por eso antes se mostro primero el setTimeout de 1 ms que el de 0 ms
                    ya que por el tiempo que paso ejecutando el codigo asyncrono llegaron a 0 ms los dos y los saco en el orden del First in/ First Out)

        Que pasa si dos timeout se terminan al mismo tiempo, Que pasa si una promesa termina al mismo tiempo que otro Callback, En que orden se ejecutan.
            Esto nos los resuelve el Even Loop
*/