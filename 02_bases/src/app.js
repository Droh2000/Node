// Este es el punto de entrada de la aplicacion
//console.log("Hola mundo desde Node")

// Para acceder a otros archivos que estan en otras carpetas 
// Como estamos en JS no hace falta que especifiquemos la extencion en el archivo
//          require('./js-foundation/01-template');

// Despues de esto al ejecutar el comando, veremos que se ejecuto todo el archivo
// Cada vez que usemo el "require" las ejecuta por eso normalmente en estos archivos solo crean funciones para registrarlas
// porque si tenemos codigo se va a ejecutar

// Como lo estamos exportando desde el archivo de origen podemos usarlo aqui 
// Y ademas la sintaxis de importacion de modulos ahora podemos desestructurar lo que exportamos.
const { emailTemplate } = require('./js-foundation/01-template'); 

console.log(emailTemplate);

require('./js-foundation/02-destructuring');

const {getUserById} = require('./js-foundation/03-callbacks');

const id = 1;

// Un Callback es una funcion que se pasa como argumento, donde especificamos en este caso para atrapar en caso de tener un mensaje de error o tener el usuario
getUserById( id, ( error, user ) => {
    if( error ){
        // Este tipo de errores seria conveniente que los almacenemos en un sistema de LOG que sea persistente en el File_sistem
        // porque al desplegar la aplicacion no se podra dar seguimiento a todos estos errores 
        // Hay que tener presente que JS con NODE no podemos concatenar con COMA dentro
        throw new Error( error );
    }
    console.log(user);
    // Supongamos que queremos pra mas usuarios entonces tenemos que volvel a llamar la funcion, y hacer anidamiento y esto conlleva al Callback_hell
    // Esto de tener Callbacks dentro de Callbacks se empieza a complicar la lectura del codigo, en ese caso es mejor trabajar con promesas que mas facil
    // de leer el codigo
});

require('./js-foundation/05-factory');

// Esta es la funcion que vamos a usar para crear nuevos objetos de personas
const { buildMakePerson } =require('./js-foundation/06-factory-aplicado');

// Aqui usamos la dependencias que requerimos
const { getAge, getUUID } = require('./plugins');

const makePerson = buildMakePerson({ getUUID, getAge });

const obj = {name: 'John', birthdate: '1985-10-21' };

const john = makePerson( obj );

console.log({ john });

// Promesas
const {getPokemonById, getPokemonById2, getPokemonById3, getPokemonById4} = require('./js-foundation/06-promises');

// const name = getPokemonById(1);
// console.log({ name });

// Le mandamos un callback para poder obtener el valor que nos regresa la promesa interna de la respuesta del Fetch
/*getPokemonById(4, ( pokemon ) => {
    console.log({ pokemon });
});*/

// Como esto es una promesa porque es lo que ahora estamos retornando, entonces para obtenr los datos que nos retorna llamamos el .then
// asi ya no tenemos que usar un callback 
getPokemonById2(4)
    .then( (pokemon) => console.log({ pokemon }))
    .catch( (err) => console.log(err) )
    .finally( () => console.log('Finalmente') );

getPokemonById3(4)
    .then( (pokemon) => console.log({ pokemon }))
    // Tenemos varias formas de controlar las promesas y asegurarnos que nunca fallen, pero cuando se van a otra parte donde no tenemos control
    // vamos a tener que manejar este catch
    .catch( (err) => console.log(err) ) // En el momento que ocurra un error en la funcion se recibe en este catch
    .finally( () => console.log('Finalmente') );

getPokemonById4(4)
    .then( (pokemon) => console.log({ pokemon }))
    .catch( (err) => console.log(err) )
    .finally( () => console.log('Finalmente') );

// Usamos el logger
const { buildLogger } = require('./plugins');

const logger = buildLogger('app.js'); // Este ese el archivo donde lo estamos mandando a llamar

// Al ejecutar el programa veremos que dentro del directorio, combined.log (Aqui tenemos el contenido donde esta el logger), 
// error.log (AQui solo veremos los Logger.error)
// Como el Logger en el "log" lo creamos entre {} nos muestra los datos como un JSON, asi podemos recorrer mejor el contenido de estos archivos
// hacer una serializacion, obtener cuales servicios son los que nos estan fallando
logger.log('Hola Mundo');

// Esto es cuando ocurre un error
logger.log('Esto es algo malo');