// Solo aqui vamos a manejar el paquete de tercero, si el dia de mañana cambiamos de paquete, solo aqui vamos a modificar
import yargs, { alias, describe } from 'yargs';
import { hideBin } from 'yargs/helpers';

/*
    Para usar la libreria tenemos de forma Syncrona y Asyncrona
    En este caso sabemos que es Syncrono y por tanto no requerimos 
    de forma asyncrona podemos recibir una promesa y un objeto, de aforma asyncrona podemos verificar el argumento que se esta recibiendo
    para ver si es lo que estamos esperando contra un backend o peticion HTTP o alguna tarea asyncrona
*/
//          export const yarg = yargs(process.argv).parseSync();

// Si le mandamos el "hideBin" nos va a ocultar el Bin Folder, por lo que al ejecutar el comando
// ya no veremos rutas de archivos
export const yarg = yargs(hideBin(process.argv))
    // Hay varias formas que tiene Yargs para configurarse
    .options('b', {
        // Aqui indicamos como debe de funcioar el argumento "b", cuando le mandamos "-b" esto es lo que va a pasar
        alias: 'base', // Nombre completo
        type: 'number', // El tipo de dato del que sera tomado el argumento
        demandOption: true, // Sea oblogatorio y si no se pasa nos dara error
        describe: 'Multiplication table base',
    })
    // En las opciones no obligatorias podemos mandar valores por defecto
    .option('l', {
        alias: 'limit',
        type: 'number',
        // Al ejecutar en la terminal el comando nos saldra la informacion de los valores que tomo
        default: 10, // Este es el valor que tendra si no se lo mandamos
        describe: 'Multiplication table limit'
    })
    // Esta opcion es para mostrar la tabla si la persona quiere
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false, // este es el valor por defecto
        describe: 'Show Multipication Table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File Name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'File Destination'
    })
    // Agregar validaciones
    // Entre los argumentos que podemos recibir estan: "argv" para sacar los parametros y "options" son todas las opciones de nuestro objeto de configuracion "yarg"
    .check(( argv, options ) => {
        // No aceptaremos que el usuario nos mande bases negativas
        if( argv.b < 1 ) throw 'Error: base must be greather than 0';// Aqui podemos meter mensajes de error

        return true;
    })
    .parseSync();